// src/config/ConfigManager.ts

import { ProviderConfig, ContractConfig, SignerConfig } from "../utils/types";
import * as fs from "fs";

class ConfigManager {
  private config: {
    providers: ProviderConfig[];
    contracts: ContractConfig[];
    signers: SignerConfig[];
  };

  constructor(configPath: string) {
    const rawData = fs.readFileSync(configPath, "utf8");
    this.config = JSON.parse(rawData);
  }

  getProviders(): ProviderConfig[] {
    return this.config.providers;
  }

  getContracts(): ContractConfig[] {
    return this.config.contracts;
  }

  getSigners(): SignerConfig[] {
    return this.config.signers;
  }
}

export default ConfigManager;
