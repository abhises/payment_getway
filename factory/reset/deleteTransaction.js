import ScyllaDb from "../../utils/ScyllaDb.js"; // Adjust path if needed

const tableName = "paymentGateway_transactions";
const userId = "user123";
const pkValue = `user#${userId}`;

async function deleteTransactions() {
  console.log(`🧹 Deleting all transactions for user ${userId}`);

  await ScyllaDb.loadTableConfigs("./tables.json"); // Make sure this path is correct
  console.log("✅ Table configs loaded");

  // Step 1: Query all transactions for the user
  const items = await ScyllaDb.query(
    tableName,
    "#pk = :pk",
    { ":pk": pkValue },
    { ExpressionAttributeNames: { "#pk": "pk" } }
  );

  if (!items || items.length === 0) {
    console.log("⚠️ No transactions found for user");
    return;
  }

  console.log(`📦 Found ${items.length} transactions`);

  // Step 2: Delete each item
  for (const item of items) {
    console.log("🔎 Item:", item);

    // Dynamically support "pk"/"PK" and "sk"/"SK" just in case
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

  console.log(`✅ Deleted ${items.length} transactions for user ${userId}`);
}

deleteTransactions()
  .then(() => console.log("🏁 Delete script complete"))
  .catch((err) => console.error("❌ Delete script error:", err));
