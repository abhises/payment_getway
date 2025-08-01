import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_order_full_data_test() {
  console.log("\n🔍 Testing: get_order_full_data\n");

  const testOrders = [
    { id: "order123", label: "[Test 1] Expected full data or []" },
    { id: "order456", label: "[Test 2] Expected full data or []" },
    { id: "invalid_order", label: "[Test 3] Expected all []" },
    { id: "order789", label: "[Test 4] Expected partial or empty" },
    { id: "order000", label: "[Test 5] Expected partial or empty" },
  ];

  for (const { id, label } of testOrders) {
    const result = await payment_gateway_service.get_order_full_data(id);

    console.log(`✅ ${label} for ${id}:`);
    console.dir(result, { depth: null });

    console.log(`   └─ Transactions: ${result.txns.length}`);
    console.log(`   └─ Sessions: ${result.sessions.length}`);
    console.log(`   └─ Schedules: ${result.schedules.length}\n`);
  }
}

// Run the test
get_order_full_data_test()
  .then(() => console.log("🎉 Completed get_order_full_data test suite"))
  .catch((err) => console.error("❌ Test failed:", err.message));
