import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js"; // Adjust path if needed

const tableName = "paymentGateway_sessions";
const userId = "user123";
const today = new Date();

function formatISODate(date) {
  return date.toISOString();
}

async function seedSessions() {
  console.log(`🧪 Seeding sessions for user ${userId}`);

  await ScyllaDb.loadTableConfigs("./tables.json"); // Load schema

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const createdAt = formatISODate(date);
    const sessionId = randomUUID();
    const orderId = `order#${1000 + i}`;

    const item = {
      pk: `user#${userId}`,
      sk: `session#${sessionId}`,
      session_id: sessionId,
      order_id: orderId,
      session_type: i % 2 === 0 ? "card" : "token",
      gateway: i % 2 === 0 ? "Stripe" : "Razorpay",
      status: i % 2 === 0 ? "completed" : "pending",
      payloads: {
        requestData: { dummy: "req-data" },
        responseData: { dummy: "res-data" },
      },
      created_at: createdAt,
    };

    await ScyllaDb.putItem(tableName, item);
    console.log(`✅ Inserted session for ${orderId} at ${createdAt}`);
  }

  console.log("🎉 Done seeding sessions");
}

seedSessions()
  .then(() => console.log("✅ Seed script complete of session too"))
  .catch((err) => console.error("❌ Seed script error:", err));
