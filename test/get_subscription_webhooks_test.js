import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_subscription_webhooks_test() {
  console.log("\n🔍 Testing: get_subscription_webhooks\n");

  // ✅ [Test 1] Valid subscription ID (sub123)
  const wh1 = await payment_gateway_service.get_subscription_webhooks(
    "sub#2025"
  );
  console.log("✅ [Test 1] Webhooks for sub123:");
  console.dir(wh1, { depth: null });
  console.log("✅ Webhook count:", wh1.length);

  // ✅ [Test 2] Valid subscription ID (sub456)
  const wh2 = await payment_gateway_service.get_subscription_webhooks(
    "sub#2025"
  );
  console.log("✅ [Test 2] Webhooks for sub456:");
  console.dir(wh2, { depth: null });
  console.log("✅ Webhook count:", wh2.length);

  // ✅ [Test 3] Invalid subscription ID — expect []
  const wh3 = await payment_gateway_service.get_subscription_webhooks(
    "invalid_sub"
  );
  console.log("✅ [Test 3] Webhooks for invalid_sub (should be empty):");
  console.dir(wh3, { depth: null });
  console.log("✅ Webhook count:", wh3.length);

  // ✅ [Test 4] Valid subscription ID (sub789)
  const wh4 = await payment_gateway_service.get_subscription_webhooks(
    "sub#2025"
  );
  console.log("✅ [Test 4] Webhooks for sub789:");
  console.dir(wh4, { depth: null });
  console.log("✅ Webhook count:", wh4.length);

  // ✅ [Test 5] Valid subscription ID (sub000)
  const wh5 = await payment_gateway_service.get_subscription_webhooks(
    "sub#2025"
  );
  console.log("✅ [Test 5] Webhooks for sub000:");
  console.dir(wh5, { depth: null });
  console.log("✅ Webhook count:", wh5.length);
}

// Run the test
get_subscription_webhooks_test()
  .then(() =>
    console.log("\n🎉 Completed get_subscription_webhooks test suite")
  )
  .catch((err) => console.error("❌ Test failed:", err.message));
