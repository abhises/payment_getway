import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_tokens_soon_to_expire_test() {
  console.log("\n🔍 Testing: get_tokens_soon_to_expire\n");

  // ✅ [Test 1] Tokens expiring in July 2025
  const tokens1 = await payment_gateway_service.get_tokens_soon_to_expire(
    "2025-09"
  );
  console.log("✅ [Test 1] Tokens expiring in 2025-07:");
  console.dir(tokens1, { depth: null });
  console.log("✅ Token count:", tokens1.length);

  // ✅ [Test 2] Tokens expiring in August 2025
  const tokens2 = await payment_gateway_service.get_tokens_soon_to_expire(
    "2025-08"
  );
  console.log("✅ [Test 2] Tokens expiring in 2025-08:");
  console.dir(tokens2, { depth: null });
  console.log("✅ Token count:", tokens2.length);

  // ✅ [Test 3] Tokens expiring in January 2026 (expect empty)
  const tokens3 = await payment_gateway_service.get_tokens_soon_to_expire(
    "2026-01"
  );
  console.log("✅ [Test 3] Tokens expiring in 2026-01 (expected empty):");
  console.dir(tokens3, { depth: null });

  // ✅ [Test 4] Tokens expiring in December 2030 (likely empty or test data)
  const tokens4 = await payment_gateway_service.get_tokens_soon_to_expire(
    "2030-12"
  );
  console.log("✅ [Test 4] Tokens expiring in 2030-12:");
  console.dir(tokens4, { depth: null });
  console.log("✅ Token count:", tokens4.length);

  // ✅ [Test 5] Invalid format — should handle gracefully
  try {
    const tokens5 = await payment_gateway_service.get_tokens_soon_to_expire(
      "invalid"
    );
    console.log(
      "✅ [Test 5] Tokens for invalid date format (should be [] or error):"
    );
    console.dir(tokens5, { depth: null });
  } catch (err) {
    console.warn("⚠️ [Test 5] Error caught as expected for invalid input:");
    console.error(err.message);
  }
}

get_tokens_soon_to_expire_test()
  .then(() =>
    console.log("\n🎉 Completed get_tokens_soon_to_expire test suite")
  )
  .catch((err) => console.error("❌ Test suite failed:", err.message));
