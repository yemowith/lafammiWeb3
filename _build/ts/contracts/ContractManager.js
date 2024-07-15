"use strict";
// src/contracts/ContractManager.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ProviderManager_1 = __importDefault(require("../managers/ProviderManager"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ContractManager {
    constructor() {
        this.contracts = {};
    }
    loadContract(config) {
        const provider = ProviderManager_1.default.getProvider(config.provider);
        const abiPath = path.resolve(__dirname, "../../build/../_build/contracts", config.abi);
        const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
        this.contracts[config.name] = new ethers_1.ethers.Contract(config.address, abi, provider);
    }
    getContract(name) {
        return this.contracts[name];
    }
    deployContract(signerName, contractName, contractJsonPath, ...constructorArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = path.basename(contractJsonPath).replace(".json", ".abi");
            console.log(a);
            return a;
            const signer = ProviderManager_1.default.getSigner(signerName);
            const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));
            const factory = new ethers_1.ethers.ContractFactory(contractJson.abi, contractJson.bytecode, signer);
            const contract = yield factory.deploy(...constructorArgs);
            yield contract.waitForDeployment();
            const deployedConfig = {
                name: contractName,
                address: yield contract.getAddress(),
                abi: path.basename(contractJsonPath).replace(".json", ".abi"),
                provider: ProviderManager_1.default.getProviderName(signer.provider),
            };
            // Save ABI to build directory
            fs.writeFileSync(path.resolve(__dirname, "../../build/../_build/contracts", deployedConfig.abi), JSON.stringify(contractJson.abi));
            return deployedConfig;
        });
    }
}
exports.default = new ContractManager();
