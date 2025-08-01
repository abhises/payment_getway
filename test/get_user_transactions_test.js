import payment_gateway_service from "../services/payment_gateway_service.js";

async function get_user_transactions_test() {
  // ✅ get_user_transactions within date range
  const txs = await payment_gateway_service.get_user_transactions(
    "user123",
    "2025-07-30T00:00:00Z",
    "2025-08-01T23:59:59Z"
  );
  console.log("✅ [Test 1] Transactions in range:");
  console.dir(txs, { depth: null });
  console.log("✅ Transaction count:", txs.length);

  // ✅ get_user_transactions without date range
  const output2 = await payment_gateway_service.get_user_transactions(
    "user123"
  );
  console.log("✅ [Test 2] All transactions for user123:");
  console.dir(output2, { depth: null });
  console.log("✅ Transaction count:", output2.length);

  // ✅ get_user_transactions for invalid user
  const output3 = await payment_gateway_service.get_user_transactions(
    "invalid_user"
  );
  console.log("✅ [Test 3] Transactions for invalid_user (should be empty):");
  console.dir(output3, { depth: null });

  // ✅ get_user_transactions with invalid date order
  const output4 = await payment_gateway_service.get_user_transactions(
    "user123",
    "2025-12-31T23:59:59Z",
    "2025-01-01T00:00:00Z"
  );
  console.log("✅ [Test 4] Invalid date range (should be empty):");
  console.dir(output4, { depth: null });

  // ✅ get_user_transactions with null dates
  const output5 = await payment_gateway_service.get_user_transactions(
    "user123",
    null,
    null
  );
  console.log("✅ [Test 5] All transactions for user123 with null dates:");
  console.dir(output5, { depth: null });
}

get_user_transactions_test();
