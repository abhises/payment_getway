import fs from "fs/promises";
import ScyllaDb from "./utils/ScyllaDb.js";

async function createTablesFromJson() {
  try {
    // Load and parse the tables.json
    const data = await fs.readFile("./tables.json", "utf-8");
    const schemas = JSON.parse(data);

    for (const [tableName, schema] of Object.entries(schemas)) {
      try {
        await ScyllaDb.createTable(schema);
        console.log(`✅ Created table: ${tableName}`);
      } catch (err) {
        console.error(`❌ Failed to create ${tableName}:`, err.message);
      }
    }
  } catch (err) {
    console.error("❌ Failed to load tables.json:", err.message);
  }
}

createTablesFromJson();
