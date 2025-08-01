import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js"; // adjust path as needed

const tableName = "paymentGateway_transactions";
const userId = "user123";
const today = new Date();

function formatISODate(date) {
  return date.toISOString();
}

async function seedTransactions() {
  console.log(`🚀 Seeding transactions for user ${userId}`);

  await ScyllaDb.loadTableConfigs("./tables.json");

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const createdAt = formatISODate(date);
    const transactionId = randomUUID();

    // 🔁 Distribute statuses: failed, completed, pending
    const status =
      i % 3 === 0 ? "failed" : i % 3 === 1 ? "completed" : "pending";

    const item = {
      pk: `user#${userId}`,
      sk: `txn#${transactionId}`,
      transaction_id: transactionId,
      amount: Math.floor(Math.random() * 1000) + 100,
      currency: "USD",
      status: status,
      statusGSI: `status#${status}`, // 👈 this must match GSI format
      order_id: `order#${1000 + i}`,
      created_at: createdAt,
      description: `Transaction ${i + 1}`,
    };

    await ScyllaDb.putItem(tableName, item);
    console.log(`✅ Inserted ${status} transaction for ${createdAt}`);
  }

  console.log("🎉 Finished seeding transactions");
}

seedTransactions()
  .then(() => console.log("✅ Token seeding complete"))
  .catch((err) => console.error("❌ Token seeding failed:", err));
