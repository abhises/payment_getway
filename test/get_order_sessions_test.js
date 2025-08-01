import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_order_sessions_test() {
  console.log("\n🔍 Testing: get_order_sessions\n");

  // ✅ [Test 1] Valid order ID and date range — expect results or []
  const sessions1 = await payment_gateway_service.get_order_sessions(
    "order#1004",
    "2025-01-01",
    "2025-12-31"
  );
  console.log("✅ [Test 1] Sessions in 2025 for order123:");
  console.dir(sessions1, { depth: null });
  console.log("✅ Session count:", sessions1.length);

  // ✅ [Test 2] Valid order ID, no date range — expect all sessions
  const sessions2 = await payment_gateway_service.get_order_sessions(
    "order#1004"
  );
  console.log("✅ [Test 2] All sessions for order123:");
  console.dir(sessions2, { depth: null });
  console.log("✅ Session count:", sessions2.length);

  // ✅ [Test 3] Invalid order ID — expect []
  const sessions3 = await payment_gateway_service.get_order_sessions(
    "invalid_order"
  );
  console.log("✅ [Test 3] Sessions for invalid order (should be empty):");
  console.dir(sessions3, { depth: null });

  // ✅ [Test 4] Valid order but future date range — expect []
  const sessions4 = await payment_gateway_service.get_order_sessions(
    "order#1004",
    "2026-01-01",
    "2026-12-31"
  );
  console.log("✅ [Test 4] Future sessions for order123 (should be empty):");
  console.dir(sessions4, { depth: null });

  // ✅ [Test 5] Null dates explicitly — expect all sessions
  const sessions5 = await payment_gateway_service.get_order_sessions(
    "order#1004",
    null,
    null
  );
  console.log("✅ [Test 5] Sessions for order123 with null dates:");
  console.dir(sessions5, { depth: null });
  console.log("✅ Session count:", sessions5.length);
}

get_order_sessions_test()
  .then(() => console.log("\n🎉 Completed get_order_sessions test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
