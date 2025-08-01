import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_order_transactions_test() {
  console.log("\n🔍 Testing: get_order_transactions\n");

  // ✅ [Test 1] Valid order ID with valid date range — expect results or []
  const tx1 = await payment_gateway_service.get_order_transactions(
    "order#1005",
    "2025-01-01",
    "2025-12-31"
  );
  console.log("✅ [Test 1] Transactions in 2025 for order123:");
  console.dir(tx1, { depth: null });
  console.log("✅ Transaction count:", tx1.length);

  // ✅ [Test 2] Valid order ID, no date range — expect all transactions
  const tx2 = await payment_gateway_service.get_order_transactions(
    "order#1005"
  );
  console.log("✅ [Test 2] All transactions for order123:");
  console.dir(tx2, { depth: null });
  console.log("✅ Transaction count:", tx2.length);

  // ✅ [Test 3] Invalid order ID — expect []
  const tx3 = await payment_gateway_service.get_order_transactions(
    "invalid_order"
  );
  console.log("✅ [Test 3] Transactions for invalid_order (should be empty):");
  console.dir(tx3, { depth: null });

  // ✅ [Test 4] Future date range — expect []
  const tx4 = await payment_gateway_service.get_order_transactions(
    "order#1005",
    "2026-01-01",
    "2026-12-31"
  );
  console.log(
    "✅ [Test 4] Future transactions for order123 (should be empty):"
  );
  console.dir(tx4, { depth: null });

  // ✅ [Test 5] Null dates explicitly — expect all transactions
  const tx5 = await payment_gateway_service.get_order_transactions(
    "order#1005",
    null,
    null
  );
  console.log("✅ [Test 5] All transactions for order123 with null dates:");
  console.dir(tx5, { depth: null });
  console.log("✅ Transaction count:", tx5.length);
}

// Run the test
get_order_transactions_test()
  .then(() => console.log("\n🎉 Completed get_order_transactions test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
