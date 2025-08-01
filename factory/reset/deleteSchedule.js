import ScyllaDb from "../../utils/ScyllaDb.js"; // Adjust path if needed

const tableName = "paymentGateway_schedules";
const userId = "user123";
const pkValue = `user#${userId}`;

// Utility: Wait for a given number of milliseconds
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteSchedules() {
  console.log(`🧹 Deleting all schedules for user ${userId}`);

  await ScyllaDb.loadTableConfigs("./tables.json");
  console.log("✅ Table configs loaded");

  // Step 1: Query all schedules for the user
  const items = await ScyllaDb.query(
    tableName,
    "#pk = :pk",
    { ":pk": pkValue },
    { ExpressionAttributeNames: { "#pk": "pk" } }
  );

  if (!items || items.length === 0) {
    console.log("⚠️ No schedules found for user");
    return;
  }

  console.log(`📦 Found ${items.length} schedules`);

  // Step 2: Delete each item using primary key
  for (const item of items) {
    const pk = item.pk || item.PK;
    const sk = item.sk || item.SK;

    if (!pk || !sk) {
      console.warn("⚠️ Skipping item due to missing pk or sk:", item);
      continue;
    }

    console.log("🗝️ Deleting with:", { pk, sk });

    try {
      await ScyllaDb.deleteItem(tableName, { pk, sk });
      console.log(`🗑️ Deleted: ${sk}`);
    } catch (err) {
      console.error(`❌ Failed to delete ${sk}:`, err.message);
    }
  }

  console.log(`✅ Deleted ${items.length} schedules for user ${userId}`);

  // Optional delay
  console.log("⏳ Waiting 3 seconds to finish cleanup...");
  await wait(3000);
  console.log("✅ Schedule deletion process complete.");
}

deleteSchedules()
  .then(() => console.log("🏁 Delete script complete"))
  .catch((err) => console.error("❌ Delete script error:", err));
