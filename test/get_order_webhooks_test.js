import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_order_webhooks_test() {
  console.log("\n🔍 Testing: get_order_webhooks\n");

  // ✅ [Test 1] Existing order with webhooks — expect results or []
  const wh1 = await payment_gateway_service.get_order_webhooks("order123");
  console.log("✅ [Test 1] Webhooks for order123:");
  console.dir(wh1, { depth: null });
  console.log("✅ Webhook count:", wh1.length);

  // ✅ [Test 2] Another order with webhooks — expect results or []
  const wh2 = await payment_gateway_service.get_order_webhooks("order456");
  console.log("✅ [Test 2] Webhooks for order456:");
  console.dir(wh2, { depth: null });
  console.log("✅ Webhook count:", wh2.length);

  // ✅ [Test 3] Invalid/nonexistent order — expect []
  const wh3 = await payment_gateway_service.get_order_webhooks("invalid_order");
  console.log("✅ [Test 3] Webhooks for invalid_order (should be empty):");
  console.dir(wh3, { depth: null });

  // ✅ [Test 4] Another seeded order — expect results or []
  const wh4 = await payment_gateway_service.get_order_webhooks("order789");
  console.log("✅ [Test 4] Webhooks for order789:");
  console.dir(wh4, { depth: null });
  console.log("✅ Webhook count:", wh4.length);

  // ✅ [Test 5] Unseeded order — expect []
  const wh5 = await payment_gateway_service.get_order_webhooks("order000");
  console.log("✅ [Test 5] Webhooks for order000 (should be empty):");
  console.dir(wh5, { depth: null });
}

// Run the test
get_order_webhooks_test()
  .then(() => console.log("\n🎉 Completed get_order_webhooks test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
