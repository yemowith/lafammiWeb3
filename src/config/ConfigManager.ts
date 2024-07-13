// src/config/ConfigManager.ts

import {
  ProviderConfig,
  ContractConfig,
  SignerConfig,
  DeployedContractConfig,
} from "../utils/types";
import * as fs from "fs";

class ConfigManager {
  private configPath: string;
  private config: {
    providers: ProviderConfig[];
    contracts: ContractConfig[];
    signers: SignerConfig[];
  };

  constructor(configPath: string) {
    this.configPath = configPath;
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

  addContract(contract: DeployedContractConfig) {
    this.config.contracts.push(contract);
    this.saveConfig();
  }

  private saveConfig() {
    fs.writeFileSync(
      this.configPath,
      JSON.stringify(this.config, null, 2),
      "utf8"
    );
  }
}

export default ConfigManager;
