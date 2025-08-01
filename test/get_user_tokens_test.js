import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_user_tokens_test() {
  console.log("\n🔍 Testing: get_user_tokens\n");

  // ✅ [Test 1] Existing user with tokens
  const tokens1 = await payment_gateway_service.get_user_tokens("user101");
  console.log("✅ [Test 1] Tokens for user123:");
  console.dir(tokens1, { depth: null });
  console.log("✅ Token count:", tokens1.length);

  // ✅ [Test 2] Another user (may or may not have tokens)
  const tokens2 = await payment_gateway_service.get_user_tokens("user102");
  console.log("✅ [Test 2] Tokens for user456:");
  console.dir(tokens2, { depth: null });
  console.log("✅ Token count:", tokens2.length);

  // ✅ [Test 3] Invalid user — expect []
  const tokens3 = await payment_gateway_service.get_user_tokens("invalid_user");
  console.log("✅ [Test 3] Tokens for invalid_user (should be empty):");
  console.dir(tokens3, { depth: null });
  console.log("✅ Token count:", tokens3.length);

  // ✅ [Test 4] Another known user
  const tokens4 = await payment_gateway_service.get_user_tokens("user103");
  console.log("✅ [Test 4] Tokens for user789:");
  console.dir(tokens4, { depth: null });
  console.log("✅ Token count:", tokens4.length);

  // ✅ [Test 5] User with likely no tokens
  const tokens5 = await payment_gateway_service.get_user_tokens("user000");
  console.log("✅ [Test 5] Tokens for user000:");
  console.dir(tokens5, { depth: null });
  console.log("✅ Token count:", tokens5.length);
}

// Run test suite
get_user_tokens_test()
  .then(() => console.log("\n🎉 Completed get_user_tokens test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
