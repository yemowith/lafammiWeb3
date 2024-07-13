// src/managers/ProviderManager.ts

import { JsonRpcProvider, Wallet } from "ethers";
import { ProviderConfig, SignerConfig } from "../utils/types";

class ProviderManager {
  private providers: { [key: string]: JsonRpcProvider } = {};
  private signers: { [key: string]: Wallet } = {};

  addProvider(config: ProviderConfig) {
    this.providers[config.name] = new JsonRpcProvider(config.url);
  }

  getProvider(name: string): JsonRpcProvider {
    return this.providers[name];
  }

  addSigner(config: SignerConfig) {
    const provider = this.getProvider(config.provider);
    if (!provider) {
      throw new Error(`Provider ${config.provider} not found`);
    }
    const signer = new Wallet(config.privateKey, provider);
    this.signers[config.name] = signer;
  }

  getSigner(name: string): Wallet {
    return this.signers[name];
  }
}

export default new ProviderManager();
