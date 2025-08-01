import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_user_sessions_test() {
  console.log("\n🔍 Testing: get_user_sessions\n");

  // ✅ [Test 1] Valid user ID with valid date range — expect results or []
  const sessions1 = await payment_gateway_service.get_user_sessions(
    "user123",
    "2025-01-01",
    "2025-12-31"
  );
  console.log("✅ [Test 1] Sessions in 2025 for user123:");
  console.dir(sessions1, { depth: null });
  console.log("✅ Session count:", sessions1.length);

  // ✅ [Test 2] Valid user ID, no date range — expect all sessions
  const sessions2 = await payment_gateway_service.get_user_sessions("user123");
  console.log("✅ [Test 2] All sessions for user123 (no date filter):");
  console.dir(sessions2, { depth: null });
  console.log("✅ Session count:", sessions2.length);

  // ✅ [Test 3] Invalid user — expect []
  const sessions3 = await payment_gateway_service.get_user_sessions(
    "invalid_user"
  );
  console.log("✅ [Test 3] Sessions for invalid_user (should be empty):");
  console.dir(sessions3, { depth: null });

  // ✅ [Test 4] Future date range — expect []
  const sessions4 = await payment_gateway_service.get_user_sessions(
    "user123",
    "2026-01-01",
    "2026-12-31"
  );
  console.log("✅ [Test 4] Future sessions for user123 (should be empty):");
  console.dir(sessions4, { depth: null });

  // ✅ [Test 5] Null dates explicitly — expect all sessions
  const sessions5 = await payment_gateway_service.get_user_sessions(
    "user123",
    null,
    null
  );
  console.log("✅ [Test 5] All sessions for user123 with null dates:");
  console.dir(sessions5, { depth: null });
  console.log("✅ Session count:", sessions5.length);
}

// Run the test
get_user_sessions_test()
  .then(() => console.log("\n🎉 Completed get_user_sessions test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
