"use strict";
// src/templates/exampleTemplate.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("../App"));
const path_1 = __importDefault(require("path"));
// Create a new instance of App with the path to the configuration file
const app = new App_1.default(path_1.default.resolve("./config/config.json"));
// Set the active provider (optional, defaults to the first provider in the config)
app.setActiveProvider("tenderly");
// Initialize transaction manager and event listener with the app instance
const transactionManager = app.transactionManager;
const eventListener = app.eventListener;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Example contract deployment
    try {
        const deployedContract = yield app.contractManager.deployContract("signer1", "NewContract", "./_build/contracts/contracts_MyContract_sol_MyContract.abi");
        app.configManager.addContract(deployedContract);
        console.log("Contract deployed and config updated:", deployedContract);
    }
    catch (error) {
        console.error("Contract deployment failed:", error);
    }
    // Example transaction
    try {
        const txReceipt = yield transactionManager.sendTransaction("MyContract", "someMethod", "signer1", 42);
        console.log("Transaction successful:", txReceipt);
    }
    catch (error) {
        console.error("Transaction failed:", error);
    }
}))();
// Example event listener
eventListener.listenToEvent("MyContract", "SomeEvent", (...args) => {
    console.log("Event triggered:", args);
});
