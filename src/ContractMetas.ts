import { JsonFragment } from '@ethersproject/abi'
import { ChainId, ChainIdKey } from './constants'
import { CrosschainQiStablecoin__factory, CrosschainQiStablecoinSlim__factory, Erc20QiStablecoin__factory } from './contracts'

export interface ContractMeta {
    address: string
    abi: JsonFragment[]
    label: string
}

export const Contracts: { [chainId in ChainIdKey]?: ContractMeta[] } = {
    [ChainId.MATIC]: [
        { label: 'WETH', address: '0x3fd939B017b31eaADF9ae50C7fF7Fa5c0661d47C', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'LINK', address: '0x61167073E31b1DAd85a3E531211c7B8F1E5cAE72', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'AAVE', address: '0x87ee36f780ae843A78D5735867bc1c13792b7b11', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'CRV', address: '0x98B5F32dd9670191568b661a3e847Ed764943875', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'BAL', address: '0x701A1824e5574B0b6b1c8dA808B184a7AB7A2867', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'dQUICK', address: '0x649Aa6E6b6194250C077DF4fB37c23EE6c098513', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'WBTC', address: '0x37131aEDd3da288467B6EBe9A77C523A700E6Ca1', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'GHST', address: '0xF086dEdf6a89e7B16145b03a6CB0C0a9979F1433', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'camWMATIC', address: '0x88d84a85A87ED12B8f098e8953B322fF789fCD1a', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'camWETH', address: '0x11a33631a5b5349af3f165d2b7901a4d67e561ad', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'camAAVE', address: '0x578375c3af7d61586c2C3A7BA87d2eEd640EFA40', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'camWBTC', address: '0x7dda5e1a389e0c1892caf55940f5fce6588a9ae0', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'camDAI', address: '0xD2FE44055b5C874feE029119f70336447c8e8827', abi: Erc20QiStablecoin__factory.abi }, //
        {
            label: 'Stake DAO USD Strategy',
            address: '0x57cbf36788113237d64e46f25a88855c3dff1691',
            abi: Erc20QiStablecoin__factory.abi,
        }, //
        { label: 'FXS', address: '0xff2c44fb819757225a176e825255a01b3b8bb051', abi: CrosschainQiStablecoin__factory.abi }, //
        { label: 'cxDOGE', address: '0x7CbF49E4214C7200AF986bc4aACF7bc79dd9C19a', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'cxADA', address: '0x506533B9C16eE2472A6BF37cc320aE45a0a24F11', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'cxWETH', address: '0x7d36999a69f2b99bf3fb98866cbbe47af43696c8', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'vGHST', address: '0x1f0aa72b980d65518e88841ba1da075bd43fa933', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'CEL', address: '0x178f1c95c85fe7221c7a6a3d6f12b7da3253eeae', abi: Erc20QiStablecoin__factory.abi }, //
        { label: 'WMATIC', address: '0x305f113ff78255d4f8524c8f50c7300b91b10f6a', abi: CrosschainQiStablecoinSlim__factory.abi }, //
        { label: 'SAND', address: '0x305f113ff78255d4f8524c8f50c7300b91b10f6a', abi: Erc20QiStablecoin__factory.abi }, //
    ],
}
