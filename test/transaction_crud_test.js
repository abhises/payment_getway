import payment_gateway_service from "../services/payment_gateway_service.js";
import { v4 as uuidv4 } from "uuid";
import ScyllaDb from "../utils/ScyllaDb.js";

const log = (stage, data) => {
  console.log(
    `\n=== ${stage.toUpperCase()} ===\n`,
    JSON.stringify(data, null, 2)
  );
};

// Utility to build update expression for DynamoDB

(async () => {
  try {
    await ScyllaDb.loadTableConfigs("./tables.json");

    const pk = `TRANSACTION#${uuidv4()}`;
    const sk = `DETAILS#${uuidv4()}`;

    // 1. CREATE
    const transactionData = {
      pk,
      sk,
      statusGSI: "PENDING",
      order_id: "order_123456",
      created_at: new Date().toISOString(),
      amount: 2500,
      currency: "USD",
    };

    await payment_gateway_service.saveTransaction(transactionData);
    log("Created Transaction", transactionData);

    // 2. UPDATE
    const rawUpdates = {
      statusGSI: "COMPLETED",
      amount: 3000,
    };

    await payment_gateway_service.updateTransaction(pk, sk, rawUpdates);
    log("Updated Transaction Fields", { pk, sk, ...rawUpdates });

    // 3. DELETE
    const test = await payment_gateway_service.deleteTransaction(pk, sk);
    console.log("test", test);
    log("Deleted Transaction", { pk, sk });

    console.log("\n✅ Transaction test completed successfully.\n");
  } catch (err) {
    console.error("\n❌ Transaction test failed:\n", err);
  }
})();
