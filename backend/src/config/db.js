import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from environment variables
    ssl: {
      rejectUnauthorized: false, // Required for secure connections to some cloud providers like Neon
    },
  });
  
  // Handle successful connection
  pool.on('connect', () => {
    console.log('🎉✅ Successfully connected to the database!');
  });
  
  // Handle idle connection errors
  pool.on('error', (err) => {
    console.error('🔥❌ Unexpected database error:', err.message);
    console.error('🛠️ Details:', err.stack); // Logs the full error stack for debugging
    process.exit(1); // Exit the process with a non-zero code
  });
  
  // Test database connection on startup
  (async () => {
    try {
      const res = await pool.query('SELECT NOW()'); // Test query
      console.log(`🕒 Database connected at: ${res.rows[0].now}`);
    } catch (err) {
      console.error('🚨❌ Failed to test the database connection!');
      console.error('🔍 Error Details:', err.message);
      process.exit(1); // Exit the process if the connection fails
    }
  })();
  
  // Export the pool for use in other files
  module.exports = pool;