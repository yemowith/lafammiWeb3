// src/App.ts

import ConfigManager from "./config/ConfigManager";
import ProviderManager from "./managers/ProviderManager";
import ContractManager from "./contracts/ContractManager";
import TransactionManager from "./managers/TransactionManager";
import EventListener from "./events/EventListener";
import { JsonRpcProvider } from "ethers";

class App {
  public configManager: ConfigManager;
  public providerManager: typeof ProviderManager;
  public contractManager: typeof ContractManager;
  public transactionManager: TransactionManager;
  public eventListener: EventListener;
  private activeProviderName: string = "";

  constructor(configPath: string) {
    this.configManager = new ConfigManager(configPath);
    this.providerManager = ProviderManager;
    this.contractManager = ContractManager;
    this.transactionManager = new TransactionManager(this);
    this.eventListener = new EventListener(this);

    this.initialize();
  }

  private initialize() {
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

  public setActiveProvider(providerName: string) {
    if (!this.providerManager.getProvider(providerName)) {
      throw new Error(`Provider ${providerName} not found`);
    }
    this.activeProviderName = providerName;
  }

  public getActiveProvider(): JsonRpcProvider {
    return this.providerManager.getProvider(this.activeProviderName);
  }
}

export default App;
