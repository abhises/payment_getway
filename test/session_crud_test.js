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
    // Step 1: Load table configuration
    await ScyllaDb.loadTableConfigs("./tables.json");

    // Step 2: Generate PK/SK and prepare sample session data
    const pk = `SESSION#${uuidv4()}`;
    const sk = `USER#${uuidv4()}`;

    const sessionData = {
      pk,
      sk,
      order_id: `order_${uuidv4()}`,
      user_id: `user_${uuidv4()}`,
      created_at: new Date().toISOString(),
      ip_address: "192.168.1.100",
      device_type: "mobile",
      session_status: "ACTIVE",
    };

    // Step 3: Save the session record
    await payment_gateway_service.saveSession(sessionData);
    log("Created Session", sessionData);

    // Step 4: Update the session record
    const updates = {
      session_status: "EXPIRED",
      ip_address: "192.168.1.200",
    };

    await payment_gateway_service.updateSession(pk, sk, updates);
    log("Updated Session Fields", { pk, sk, ...updates });

    // Step 5: Delete the session record
    await payment_gateway_service.deleteSession(pk, sk);
    log("Deleted Session", { pk, sk });

    console.log("\n✅ Session CRUD test completed successfully.\n");
  } catch (err) {
    console.error("\n❌ Session CRUD test failed:\n", err);
  }
})();
