import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_user_schedules_test() {
  console.log("\n🔍 Testing: get_user_schedules\n");

  // ✅ [Test 1] Valid date range — expect matching results
  const schedules1 = await payment_gateway_service.get_user_schedules(
    "user123",
    "2025-07-20T00:00:00Z",
    "2025-07-31T23:59:59Z"
  );
  console.log("✅ [Test 1] Schedules in range:");
  console.dir(schedules1, { depth: null });
  console.log("✅ Schedule count:", schedules1.length);

  // ✅ [Test 2] No date range — expect all schedules
  const schedules2 = await payment_gateway_service.get_user_schedules(
    "user123"
  );
  console.log("✅ [Test 2] All schedules for user123:");
  console.dir(schedules2, { depth: null });
  console.log("✅ Schedule count:", schedules2.length);

  // ✅ [Test 3] Invalid user — expect []
  const schedules3 = await payment_gateway_service.get_user_schedules(
    "ghost_user"
  );
  console.log("✅ [Test 3] Schedules for invalid user (should be empty):");
  console.dir(schedules3, { depth: null });

  // ✅ [Test 4] Inverted date range — expect []
  const schedules4 = await payment_gateway_service.get_user_schedules(
    "user123",
    "2025-12-31T23:59:59Z",
    "2025-01-01T00:00:00Z"
  );
  console.log("✅ [Test 4] Inverted date range (should be empty):");
  console.dir(schedules4, { depth: null });

  // ✅ [Test 5] Null dates explicitly — expect all results
  const schedules5 = await payment_gateway_service.get_user_schedules(
    "user123",
    null,
    null
  );
  console.log("✅ [Test 5] Schedules with null dates (should return all):");
  console.dir(schedules5, { depth: null });
}

get_user_schedules_test();
