// src/events/EventListener.ts

import ContractManager from "../contracts/ContractManager";
import App from "../App";

class EventListener {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  listenToEvent(
    contractName: string,
    eventName: string,
    callback: (...args: any[]) => void
  ) {
    const contract = ContractManager.getContract(contractName);
    contract.on(eventName, callback);
  }
}

export default EventListener;
