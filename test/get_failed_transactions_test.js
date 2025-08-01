import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_failed_transactions_test() {
  console.log("\n🔍 Testing: get_failed_transactions\n");

  // ✅ [Test 1] Valid date range — expect failed transactions or []
  const tx1 = await payment_gateway_service.get_failed_transactions(
    "2025-01-01",
    "2025-12-31"
  );
  console.log("✅ [Test 1] Failed transactions in 2025:");
  console.dir(tx1, { depth: null });
  console.log("✅ Count:", tx1.length);

  // ✅ [Test 2] No date range — expect all failed transactions
  const tx2 = await payment_gateway_service.get_failed_transactions();
  console.log("✅ [Test 2] All failed transactions (no date filter):");
  console.dir(tx2, { depth: null });
  console.log("✅ Count:", tx2.length);

  // ✅ [Test 3] Future range — expect []
  const tx3 = await payment_gateway_service.get_failed_transactions(
    "2026-01-01",
    "2026-12-31"
  );
  console.log("✅ [Test 3] Future failed transactions (should be empty):");
  console.dir(tx3, { depth: null });

  // ✅ [Test 4] Inverted range — expect [] or warning
  const tx4 = await payment_gateway_service.get_failed_transactions(
    "2025-12-31",
    "2025-01-01"
  );
  console.log("✅ [Test 4] Inverted date range (should be empty or warning):");
  console.dir(tx4, { depth: null });

  // ✅ [Test 5] Null dates explicitly — expect all failed transactions
  const tx5 = await payment_gateway_service.get_failed_transactions(null, null);
  console.log("✅ [Test 5] Null dates (should return all failed txns):");
  console.dir(tx5, { depth: null });
  console.log("✅ Count:", tx5.length);
}

// Run the test
get_failed_transactions_test()
  .then(() => console.log("\n🎉 Completed get_failed_transactions test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
