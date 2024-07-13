// src/managers/TransactionManager.ts

import { ethers } from "ethers";
import ContractManager from "../contracts/ContractManager";
import App from "../App";

class TransactionManager {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  async sendTransaction(
    contractName: string,
    methodName: string,
    signerName: string,
    ...args: any[]
  ) {
    const contract = ContractManager.getContract(contractName);
    const signer = this.app.providerManager.getSigner(signerName);
    const contractWithSigner = contract.connect(signer);
    const tx = await (contractWithSigner as any)[methodName](...args);
    return tx.wait();
  }
}

export default TransactionManager;
