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
    const pk = `WEBHOOK#${uuidv4()}`;
    const sk = `TRIGGER#${uuidv4()}`;

    const webhookData = {
      pk,
      sk,
      subscriptionId: `sub_${uuidv4()}`,
      created_at: new Date().toISOString(),
      event: "subscription.created",
      status: "RECEIVED",
    };

    // Step 3: Save the webhook
    await payment_gateway_service.saveWebhook(webhookData);
    log("Created Webhook", webhookData);

    // Step 4: Update the webhook
    const updates = {
      status: "PROCESSED",
      event: "subscription.updated",
    };

    await payment_gateway_service.updateWebhook(pk, sk, updates);
    log("Updated Webhook Fields", { pk, sk, ...updates });

    // Step 5: Delete the webhook
    await payment_gateway_service.deleteWebhook(pk, sk);
    log("Deleted Webhook", { pk, sk });

    console.log("\n✅ Webhook CRUD test completed successfully.\n");
  } catch (err) {
    console.error("\n❌ Webhook CRUD test failed:\n", err);
  }
})();
