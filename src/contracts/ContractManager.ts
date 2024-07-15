// src/contracts/ContractManager.ts

import { ethers, JsonRpcProvider, Wallet } from "ethers";
import ProviderManager from "../managers/ProviderManager";
import { ContractConfig, DeployedContractConfig } from "../utils/types";
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

  async deployContract(
    signerName: string,
    contractName: string,
    contractJsonPath: string,
    ...constructorArgs: any[]
  ): Promise<DeployedContractConfig> {
    const a = path.basename(contractJsonPath).replace(".json", ".abi");
    console.log(a);
    return a as any;
    const signer = ProviderManager.getSigner(signerName);
    const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));

    const factory = new ethers.ContractFactory(
      contractJson.abi,
      contractJson.bytecode,
      signer
    );

    const contract = await factory.deploy(...constructorArgs);
    await contract.waitForDeployment();

    const deployedConfig: DeployedContractConfig = {
      name: contractName,
      address: await contract.getAddress(),
      abi: path.basename(contractJsonPath).replace(".json", ".abi"),
      provider: ProviderManager.getProviderName(
        signer.provider as JsonRpcProvider
      ),
    };

    // Save ABI to build directory
    fs.writeFileSync(
      path.resolve(
        __dirname,
        "../../build/../_build/contracts",
        deployedConfig.abi
      ),
      JSON.stringify(contractJson.abi)
    );

    return deployedConfig;
  }
}

export default new ContractManager();
