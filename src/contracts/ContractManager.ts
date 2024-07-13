// src/contracts/ContractManager.ts

import { ethers } from "ethers";
import ProviderManager from "../managers/ProviderManager";
import { ContractConfig } from "../utils/types";
import * as fs from "fs";
import * as path from "path";

class ContractManager {
  private contracts: { [key: string]: ethers.Contract } = {};

  loadContract(config: ContractConfig) {
    const provider = ProviderManager.getProvider(config.provider);
    const abiPath = path.resolve(
      __dirname,
      "../../build/../_build/contracts",
      config.abi
    );
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    this.contracts[config.name] = new ethers.Contract(
      config.address,
      abi,
      provider
    );
  }

  getContract(name: string): ethers.Contract {
    return this.contracts[name];
  }
}

export default new ContractManager();
