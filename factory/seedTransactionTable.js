import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js"; // adjust path as needed

const tableName = "paymentGateway_transactions";
const userId = "user123";
const today = new Date();

function formatISODate(date) {
  return date.toISOString();
}

async function seedTransactions() {
  console.log(`Seeding transactions for user ${userId}`);

  await ScyllaDb.loadTableConfigs("./tables.json"); // or correct relative path

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const createdAt = formatISODate(date);
    const transactionId = randomUUID();

    const item = {
      pk: `user#${userId}`,
      sk: `txn#${transactionId}`,
      transaction_id: transactionId,
      amount: Math.floor(Math.random() * 1000) + 100,
      currency: "USD",
      status: i % 2 === 0 ? "completed" : "pending",
      statusGSI: i % 2 === 0 ? "completed" : "pending",
      order_id: `order#${1000 + i}`, // 👈 Add order_id
      created_at: createdAt,
      description: `Transaction ${i + 1}`,
    };

    await ScyllaDb.putItem(tableName, item);
    console.log(`✅ Inserted transaction for ${createdAt}`);
  }

  console.log("🎉 Done seeding 40 transactions");
}

seedTransactions()
  .then(() => console.log("✅ Seed script complete"))
  .catch((err) => console.error("❌ Seed script error:", err));
