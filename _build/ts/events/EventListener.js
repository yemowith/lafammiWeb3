"use strict";
// src/events/EventListener.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContractManager_1 = __importDefault(require("../contracts/ContractManager"));
class EventListener {
    constructor(app) {
        this.app = app;
    }
    listenToEvent(contractName, eventName, callback) {
        const contract = ContractManager_1.default.getContract(contractName);
        contract.on(eventName, callback);
    }
}
exports.default = EventListener;
