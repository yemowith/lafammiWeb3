"use strict";
// src/managers/ProviderManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class ProviderManager {
    constructor() {
        this.providers = {};
    }
    addProvider(config) {
        this.providers[config.name] = new ethers_1.JsonRpcProvider(config.url);
    }
    getProvider(name) {
        return this.providers[name];
    }
}
exports.default = new ProviderManager();
