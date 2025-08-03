import payment_gateway_service from "../services/payment_gateway_service.js";
import { v4 as uuidv4 } from "uuid";
import ScyllaDb from "../utils/ScyllaDb.js";

const log = (stage, data) => {
  console.log(
    `\n=== ${stage.toUpperCase()} ===\n`,
    JSON.stringify(data, null, 2)
  );
};

(async () => {
  try {
    // Step 1: Load the table config
    await ScyllaDb.loadTableConfigs("./tables.json");

    // Step 2: Generate PK/SK and sample data
    const pk = `TOKEN#${uuidv4()}`;
    const sk = `SESSION#${uuidv4()}`;

    const tokenData = {
      pk,
      sk,
      expiry: new Date(Date.now() + 86400000).toISOString(), // expires in 1 day
      token_value: uuidv4(),
      user_id: `user_${uuidv4()}`,
      created_at: new Date().toISOString(),
    };

    // Step 3: Save the token
    await payment_gateway_service.saveToken(tokenData);
    log("Created Token", tokenData);

    // Step 4: Update the token
    const updates = {
      expiry: new Date(Date.now() + 2 * 86400000).toISOString(), // expires in 2 days
      token_value: uuidv4(),
    };

    await payment_gateway_service.updateToken(pk, sk, updates);
    log("Updated Token Fields", { pk, sk, ...updates });

    // Step 5: Delete the token
    await payment_gateway_service.deleteToken(pk, sk);
    log("Deleted Token", { pk, sk });

    console.log("\n✅ Token CRUD test completed successfully.\n");
  } catch (err) {
    console.error("\n❌ Token CRUD test failed:\n", err);
  }
})();
