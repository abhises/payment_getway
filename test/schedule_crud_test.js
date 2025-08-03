import payment_gateway_service from "../services/payment_gateway_service.js"; // Adjust to your actual filename
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
    // Load table config
    await ScyllaDb.loadTableConfigs("./tables.json");

    // Create primary key
    const pk = `SCHEDULE#${uuidv4()}`;
    const sk = `TIMING#${uuidv4()}`;

    // 1. CREATE
    const scheduleData = {
      pk,
      sk,
      subscriptionId: `sub_${uuidv4()}`,
      order_id: `order_${uuidv4()}`,
      created_at: new Date().toISOString(),
      scheduled_time: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour later
      status: "PENDING",
    };

    await payment_gateway_service.saveSchedule(scheduleData);
    log("Created Schedule", scheduleData);

    // 2. UPDATE
    const updates = {
      status: "COMPLETED",
      scheduled_time: new Date(Date.now() + 7200 * 1000).toISOString(), // 2 hours later
    };

    await payment_gateway_service.updateSchedule(pk, sk, updates);
    log("Updated Schedule Fields", { pk, sk, ...updates });

    // 3. DELETE
    const deleted = await payment_gateway_service.deleteSchedule(pk, sk);
    log("Deleted Schedule", { pk, sk });

    console.log("\n✅ Schedule CRUD test completed successfully.\n");
  } catch (err) {
    console.error("\n❌ Schedule CRUD test failed:\n", err);
  }
})();
