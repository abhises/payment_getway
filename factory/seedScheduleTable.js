import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js";

const tableName = "paymentGateway_schedules";
const userId = "user123";
const today = new Date();

function formatISODate(date) {
  return date.toISOString();
}

// 👇 Utility to wait for N ms
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function seedSchedules() {
  console.log(`📅 Seeding schedules for user ${userId}`);

  // Load table configuration
  await ScyllaDb.loadTableConfigs("./tables.json");

  for (let i = 0; i < 4; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i); // Future schedules

    const createdAt = formatISODate(new Date());
    const scheduledFor = formatISODate(date);
    const scheduleId = randomUUID();
    const subscriptionId = `sub#${Math.floor(Math.random() * 10000)}`;
    const orderId = `order#${1000 + i}`; // 👈 Add order_id here

    const item = {
      pk: `user#${userId}`,
      sk: `schedule#${scheduleId}`,
      schedule_id: scheduleId,
      subscriptionId,
      order_id: orderId, // ✅ Add to item
      scheduled_for: scheduledFor,
      created_at: createdAt,
      retry_count: 0,
      status: i % 2 === 0 ? "pending" : "processing",
    };

    await ScyllaDb.putItem(tableName, item);
    console.log(
      `✅ Inserted schedule for ${scheduledFor} with order_id: ${orderId}`
    );
  }

  console.log("🎉 Done seeding schedules");

  // ✅ Add delay
  console.log("⏳ Waiting 3 seconds after test completion...");
  await wait(3000);
  console.log("✅ Schedule seed test has been completed.");
}

seedSchedules()
  .then(() => console.log("✅ Seed script complete"))
  .catch((err) => console.error("❌ Seed script error:", err));
