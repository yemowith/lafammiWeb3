// src/utils/types.ts

export interface ProviderConfig {
  name: string;
  url: string;
}

export interface ContractConfig {
  name: string;
  address: string;
  abi: string;
  provider: string;
}

export interface SignerConfig {
  name: string;
  privateKey: string;
  provider: string;
}

export interface DeployedContractConfig extends ContractConfig {}
