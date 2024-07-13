"use strict";
// src/managers/ProviderManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class ProviderManager {
    constructor() {
        this.providers = {};
        this.signers = {};
    }
    addProvider(config) {
        this.providers[config.name] = new ethers_1.JsonRpcProvider(config.url);
    }
    getProvider(name) {
        return this.providers[name];
    }
    addSigner(config) {
        const provider = this.getProvider(config.provider);
        if (!provider) {
            throw new Error(`Provider ${config.provider} not found`);
        }
        const signer = new ethers_1.Wallet(config.privateKey, provider);
        this.signers[config.name] = signer;
    }
    getSigner(name) {
        return this.signers[name];
    }
}
exports.default = new ProviderManager();
