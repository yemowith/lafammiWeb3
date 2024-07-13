// src/templates/exampleTemplate.ts

import App from "../App";
import path from "path";

// Create a new instance of App with the path to the configuration file
const app = new App(path.resolve("./config/config.json"));

// Set the active provider (optional, defaults to the first provider in the config)
app.setActiveProvider("tenderly");

// Initialize transaction manager and event listener with the app instance
const transactionManager = app.transactionManager;
const eventListener = app.eventListener;

// Example transaction
(async () => {
  try {
    const txReceipt = await transactionManager.sendTransaction(
      "MyContract",
      "someMethod",
      "signer1",
      42
    );
    console.log("Transaction successful:", txReceipt);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
})();

// Example event listener
eventListener.listenToEvent("MyContract", "SomeEvent", (...args) => {
  console.log("Event triggered:", args);
});
