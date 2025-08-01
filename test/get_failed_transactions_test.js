import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_failed_transactions_test() {
  console.log("\n🔍 Testing: get_failed_transactions\n");

  // ✅ [Test 1] Within expected date range — expect failed transactions
  const tx1 = await payment_gateway_service.get_failed_transactions(
    "2025-01-01",
    "2025-12-31"
  );
  console.log("✅ [Test 1] Failed transactions in 2025:");
  console.dir(tx1, { depth: null });
  console.log("✅ Count:", tx1.length);

  // ✅ [Test 2] No date range — expect all failed transactions
  const tx2 = await payment_gateway_service.get_failed_transactions();
  console.log("✅ [Test 2] All failed transactions:");
  console.dir(tx2, { depth: null });

  // ✅ [Test 3] Future range — expect []
  const tx3 = await payment_gateway_service.get_failed_transactions(
    "2026-01-01",
    "2026-12-31"
  );
  console.log("✅ [Test 3] Future (should be empty):");
  console.dir(tx3);

  // ✅ [Test 4] Inverted range — expect []
  const tx4 = await payment_gateway_service.get_failed_transactions(
    "2025-12-31",
    "2025-01-01"
  );
  console.log("✅ [Test 4] Inverted range (should be empty):");
  console.dir(tx4);

  // ✅ [Test 5] Null explicitly — expect all failed
  const tx5 = await payment_gateway_service.get_failed_transactions(null, null);
  console.log("✅ [Test 5] Null dates (all failed):");
  console.dir(tx5);
}

get_failed_transactions_test()
  .then(() => console.log("🎉 Completed get_failed_transactions test suite"))
  .catch((err) => console.error("❌ Test failed:", err));
