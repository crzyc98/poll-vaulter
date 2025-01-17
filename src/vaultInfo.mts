import { JsonFragment } from "@ethersproject/abi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers-multicall";
import _ from "lodash";
import { ChainIdKey, RPCS } from "./constants.js";
import { ERC20__factory } from "./contracts/index.js";
import { multicall } from "./multicall.mjs";

export async function fetchVaultInfo(chainId: ChainIdKey, contractAddress: string, abi: JsonFragment[]) {
    const ethersProvider = new JsonRpcProvider(RPCS[chainId]);
    const vaultContract = new Contract(contractAddress, abi);

    const totalSupplyCall = vaultContract.totalSupply();
    const collateralPriceCall = vaultContract.getEthPriceSource();
    const collateralAddressCall = vaultContract.collateral();

    let [totalSupply, collateralPrice, collateralAddress] = await multicall(chainId, [
        totalSupplyCall,
        collateralPriceCall,
        collateralAddressCall,
    ])

    totalSupply = totalSupply.toNumber()
    collateralPrice = (collateralPrice as unknown as number) / 1e8

    const collateralERC20 = ERC20__factory.connect(collateralAddress, ethersProvider)
    const tokenName = await collateralERC20.symbol()
    const tokenDecimals = await collateralERC20.decimals()
    const limitToFetch = totalSupply
    const existsCalls = _.range(limitToFetch).map((i) => vaultContract.exists(i))

    const vaultsExistCheck: boolean[] = await multicall(chainId, existsCalls)
    const vaultsToFetch = _.range(limitToFetch).filter((i) => vaultsExistCheck[i])

    const collateralCalls = vaultsToFetch.map((i) => vaultContract.vaultCollateral(i))
    const collateralAmounts = await multicall(chainId, collateralCalls)
    const debtCalls = vaultsToFetch.map(i => vaultContract.vaultDebt(i))
    const debtAmounts = await multicall(chainId, debtCalls)
    const ownerCalls = vaultsToFetch.map(i => vaultContract.ownerOf(i))
    const owners = await multicall(chainId, ownerCalls)

    // let x = Erc20QiStablecoin__factory.connect(contractAddress, ethersProvider)
    interface VaultInfo {
        owner: string;
        tokenName: string
        cdr: number;
        collateral: number;
        debt: number;
        vaultIdx: number
    }

    const vaultInfo: VaultInfo[] = []

    for (let i = 0; i < vaultsToFetch.length; i++) {
        const vaultIdx = vaultsToFetch[i]
        const owner = owners[i]
        const collateral = collateralAmounts[i] as unknown as number / tokenDecimals
        const debt = debtAmounts[i] as unknown as number / 1e18
        let cdr = collateral * collateralPrice / debt
        cdr = isNaN(cdr) ? 0 : cdr
        vaultInfo.push({ vaultIdx, tokenName, owner, cdr, collateral, debt })
    }
    return vaultInfo
}
