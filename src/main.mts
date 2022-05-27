import fastCsv from "fast-csv";
import * as fs from "fs";
import { ChainId } from "./constants.js";
import { ContractMeta, Contracts } from "./ContractMetas.js";
import { init } from "./multicall.mjs";
import { fetchVaultInfo } from "./vaultInfo.mjs";

const CSVOptions = {
    objectMode: true,
    delimiter: ",",
    headers: true,
    renameHeaders: false
};
const chainId = ChainId.OPTIMISM;
const fileName = "optimism.csv";


const contractMetas: ContractMeta[] | undefined = Contracts[chainId];
console.time("Setup");
await init();
console.timeEnd("Setup");

console.time("Fetching");
const vaultInfoPromises = contractMetas?.map((contractMeta) => {
    return fetchVaultInfo(chainId, contractMeta.address, contractMeta.abi);
})

if (vaultInfoPromises)
    Promise.all(vaultInfoPromises).then((res) => {
        const csvFile = fs.createWriteStream(fileName);
        const stream = fastCsv.format(CSVOptions);
        console.timeEnd("Fetching");
        stream.pipe(csvFile);
        res.flat().forEach(v => stream.write(v));
        stream.end();
        console.log(res.length);
    })
