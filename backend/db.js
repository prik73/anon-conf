// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }, // Required for Neon
// });

// pool.connect()
//   .then(() => console.log("✅ Connected to Neon PostgreSQL"))
//   .catch(err => console.error("❌ Database connection error", err));

// module.exports = pool;




// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Use Neon PostgreSQL URL
//   ssl: { rejectUnauthorized: false } // Required for Neon cloud database
// });

// pool.connect()
//   .then(() => console.log("✅ Connected to PostgreSQL Database"))
//   .catch((err) => console.error("❌ Database connection error", err));

// module.exports = pool;




// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Required for NeonDB
//   },
//   idleTimeoutMillis: 30000, // 30 sec before closing idle connections
//   connectionTimeoutMillis: 5000, // 5 sec timeout for new connections
// });

// pool.on("connect", () => {
//   console.log("✅ Connected to PostgreSQL Database");
// });

// pool.on("error", (err) => {
//   console.error("❌ Database Error", err);
// });

// module.exports = pool;




// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Use environment variable for security
//   ssl: {
//     rejectUnauthorized: false, // Required for Neon
//   },
//   idleTimeoutMillis: 30000, // 30 seconds timeout
//   connectionTimeoutMillis: 5000, // 5 seconds to connect before failing
// });

// pool.on("connect", () => {
//   console.log("✅ Connected to PostgreSQL Database");
// });

// pool.on("error", (err) => {
//   console.error("❌ Database connection error:", err);
// });

// module.exports = pool;




require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL Database");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err);
});

module.exports = pool;



