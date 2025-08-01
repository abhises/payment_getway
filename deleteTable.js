import ScyllaDb from "./utils/ScyllaDb.js";

// List all your table names here
const tableNames = [
  "paymentGateway_sessions",
  "paymentGateway_transactions",
  "paymentGateway_schedules",
  "paymentGateway_tokens",
  "paymentGateway_webhooks",
];

async function deleteAllTables() {
  for (const tableName of tableNames) {
    try {
      await ScyllaDb.deleteTable(tableName);
      console.log(`🗑️ Successfully deleted table: ${tableName}`);
    } catch (err) {
      console.error(`❌ Failed to delete table ${tableName}:`, err.message);
    }
  }
}

deleteAllTables()
  .then(() => console.log("✅ All tables deletion attempt completed"))
  .catch((err) => console.error("❌ Deletion process error:", err.message));
