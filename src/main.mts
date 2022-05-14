import { ChainId } from './constants.js'
import { ContractMeta, Contracts } from './ContractMetas.js'
import { init } from './multicall.mjs'
import { fetchVaultInfo } from './vaultInfo.mjs'

const chainId = ChainId.MATIC
const contractMetas: ContractMeta[] | undefined = Contracts[chainId]
console.time('Setup')
await init()
console.timeEnd('Setup')

console.time('Fetching')
const vaultInfoPromises = contractMetas?.map((contractMeta) => {
    return fetchVaultInfo(chainId, contractMeta.address, contractMeta.abi)
})

if (vaultInfoPromises)
    Promise.all(vaultInfoPromises).then((res) => {
        console.log(res.length)
        console.timeEnd('Fetching')
    })
