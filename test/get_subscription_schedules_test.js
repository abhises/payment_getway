import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_subscription_schedules_test() {
  console.log("📦 Running get_subscription_schedules test suite...\n");

  // ✅ Test 1: Expected schedules in valid date range
  const result1 = await payment_gateway_service.get_subscription_schedules(
    "sub#5654",
    "2025-01-01",
    "2025-12-31"
  );

  console.log("✅ [Test 1] Schedules in range:");
  console.dir(result1, { depth: null });

  // ✅ Test 2: All schedules for subscription
  const result2 = await payment_gateway_service.get_subscription_schedules(
    "sub#5654"
  );
  console.log("✅ [Test 2] All schedules for sub123:");
  console.dir(result2, { depth: null });

  // ✅ Test 3: Invalid subscription should return []
  const result3 = await payment_gateway_service.get_subscription_schedules(
    "invalid_sub"
  );
  console.log("✅ [Test 3] Schedules for invalid_sub (should be empty):");
  console.dir(result3, { depth: null });

  // ✅ Test 4: Future date range with no data
  const result4 = await payment_gateway_service.get_subscription_schedules(
    "sub#5654",
    "2026-01-01T00:00:00Z",
    "2026-12-31T23:59:59Z"
  );
  console.log("✅ [Test 4] Future range with no schedules (should be empty):");
  console.dir(result4, { depth: null });

  // ✅ Test 5: Pass null for dates to get all schedules
  const result5 = await payment_gateway_service.get_subscription_schedules(
    "sub#5654",
    null,
    null
  );
  console.log("✅ [Test 5] All schedules using null dates:");
  console.dir(result5, { depth: null });

  console.log("\n🎉 Completed get_subscription_schedules test suite.");
}

// Run the test
get_subscription_schedules_test()
  .then(() => console.log("✅ Test finished successfully"))
  .catch((err) => console.error("❌ Test failed:", err.message));
