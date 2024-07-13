"use strict";
// src/managers/TransactionManager.ts
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
const ContractManager_1 = __importDefault(require("../contracts/ContractManager"));
class TransactionManager {
    constructor(app) {
        this.app = app;
    }
    sendTransaction(contractName, methodName, signerName, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = ContractManager_1.default.getContract(contractName);
            const signer = this.app.providerManager.getSigner(signerName);
            const contractWithSigner = contract.connect(signer);
            const tx = yield contractWithSigner[methodName](...args);
            return tx.wait();
        });
    }
}
exports.default = TransactionManager;
