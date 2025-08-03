<!-- folder structure -->

├── factory/ # Seeder scripts for populating tables
│ ├── seedTransactionTable.js
│ ├── seedScheduleTable.js
│ ├── seedUserSession.js
│ ├── seedToken.js
│ ├── seedWebhook.js
│ └── reset/
│ ├── deleteTransaction.js
│ └── deleteSchedule.js

├── services/ # Core business logic and service functions

├── test/ # Test cases for each module
│ ├── get_user_transactions_test.js
│ ├── get_user_schedules_test.js
│ ├── ...
│ └── get_order_full_data_test.js

├── utils/ # Utility functions (e.g. helpers, constants)

├── createTable.js # Script to create DynamoDB tables using tables.json
├── deleteTable.js # Script to delete DynamoDB tables
├── tables.json # Table schema and GSI definitions
└── package.json

1. 📦 Install Dependencies

npm install

2. 🛠 Table Lifecycle Scripts
   Script Purpose

   npm run createTable
   <!-- Creates the DynamoDB table(s) as defined in tables.json. -->

   npm run deleteTable
   <!-- Deletes the existing DynamoDB table(s). -->

   npm run seed
   <!-- Seeds all major tables with sample data in parallel. -->

   npm run seed:reset
   <!-- Clears only transactions and schedules for partial re-seeding. -->

3. 🧪 Test Coverage
   Tests are split across multiple files and executed via the test script:

npm test

Current test cases include:
User transactions, sessions, tokens

Order transactions and sessions

Subscription schedules

Token expiration edge cases

Failed payments

Webhook data

Full order data views

🧾 Table Configuration – tables.json
Defines your DynamoDB schema, including:

AttributeDefinitions

KeySchema

GlobalSecondaryIndexes

✅ Ensure GSIs are correctly named and referenced in both this config and your query logic.
