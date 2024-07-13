"use strict";
// src/App.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigManager_1 = __importDefault(require("./config/ConfigManager"));
const ProviderManager_1 = __importDefault(require("./managers/ProviderManager"));
const ContractManager_1 = __importDefault(require("./contracts/ContractManager"));
const TransactionManager_1 = __importDefault(require("./managers/TransactionManager"));
const EventListener_1 = __importDefault(require("./events/EventListener"));
class App {
    constructor(configPath) {
        this.activeProviderName = "";
        this.configManager = new ConfigManager_1.default(configPath);
        this.providerManager = ProviderManager_1.default;
        this.contractManager = ContractManager_1.default;
        this.transactionManager = new TransactionManager_1.default(this);
        this.eventListener = new EventListener_1.default(this);
        this.initialize();
    }
    initialize() {
        const providers = this.configManager.getProviders();
        providers.forEach((providerConfig) => {
            this.providerManager.addProvider(providerConfig);
        });
        const signers = this.configManager.getSigners();
        signers.forEach((signerConfig) => {
            this.providerManager.addSigner(signerConfig);
        });
        // Set default active provider
        if (providers.length > 0) {
            this.setActiveProvider(providers[0].name);
        }
        const contracts = this.configManager.getContracts();
        contracts.forEach((contractConfig) => {
            this.contractManager.loadContract(contractConfig);
        });
    }
    setActiveProvider(providerName) {
        if (!this.providerManager.getProvider(providerName)) {
            throw new Error(`Provider ${providerName} not found`);
        }
        this.activeProviderName = providerName;
    }
    getActiveProvider() {
        return this.providerManager.getProvider(this.activeProviderName);
    }
}
exports.default = App;
