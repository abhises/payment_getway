import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js"; // Adjust path as needed

const tableName = "paymentGateway_webhooks";
const today = new Date();

function formatISODate(date) {
  return date.toISOString();
}

async function seedWebhooks() {
  console.log("🚀 Seeding paymentGateway_webhooks");

  await ScyllaDb.loadTableConfigs("./tables.json"); // Ensure it includes webhooks schema

  const testOrders = ["order123", "order456", "order789"];
  const testSubs = ["sub#5037", "sub#8888", "sub#2025"];

  for (let i = 0; i < 10; i++) {
    const orderId = testOrders[i % testOrders.length];
    const subscriptionId = testSubs[i % testSubs.length];

    const webhookId = randomUUID();
    const createdAt = formatISODate(new Date(today.getTime() - i * 86400000));

    const item = {
      pk: `order#${orderId}`,
      sk: `webhook#${webhookId}`,
      webhook_id: webhookId,
      actionTaken: i % 2 === 0 ? "payment_succeeded" : "payment_failed",
      handled: i % 2 === 0,
      subscriptionId, // Required for the GSI
      idempotencyKey: `idem-${1000 + i}`,
      payload: {
        event: i % 2 === 0 ? "charge.success" : "charge.failed",
        amount: Math.floor(Math.random() * 1000) + 100,
      },
      created_at: createdAt,
    };

    await ScyllaDb.putItem(tableName, item);
    console.log(`✅ Inserted webhook for ${orderId} / ${subscriptionId}`);
  }

  console.log("🎉 Done seeding paymentGateway_webhooks");
}

seedWebhooks()
  .then(() => console.log("✅ Webhook seeding complete"))
  .catch((err) => console.error("❌ Seeding error:", err));
