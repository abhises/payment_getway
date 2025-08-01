import { randomUUID } from "crypto";
import ScyllaDb from "../utils/ScyllaDb.js"; // Adjust path as needed

const tableName = "paymentGateway_tokens";

// Predefined 5 known user IDs
const userIds = ["user101", "user102", "user103", "user104", "user105"];

function formatISODate(date) {
  return date.toISOString();
}

function getExpiry(year, month) {
  return `${year}-${month.toString().padStart(2, "0")}`;
}

async function seedTokens() {
  console.log(`🚀 Seeding tokens for users: ${userIds.join(", ")}`);

  await ScyllaDb.loadTableConfigs("./tables.json");

  for (const userId of userIds) {
    for (let i = 0; i < 3; i++) {
      const tokenId = randomUUID();
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + i);

      const expiry = getExpiry(
        expiryDate.getFullYear(),
        expiryDate.getMonth() + 1
      );

      const item = {
        pk: `user#${userId}`,
        sk: `token#${tokenId}`,
        token_id: tokenId,
        registrationId: `reg#${1000 + i}`,
        last4: `${Math.floor(1000 + Math.random() * 9000)}`,
        expiry: expiry,
        name: `Cardholder ${i + 1}`,
        type: i % 2 === 0 ? "VISA" : "MASTERCARD",
        created_at: formatISODate(new Date()),
      };

      await ScyllaDb.putItem(tableName, item);
      console.log(
        `✅ [${userId}] Inserted token ${tokenId} expiring ${expiry}`
      );
    }
  }

  console.log("🎉 Finished seeding tokens for all users");
}

seedTokens()
  .then(() => console.log("✅ Token seeding complete"))
  .catch((err) => console.error("❌ Token seeding failed:", err));
