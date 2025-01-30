import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../../.env') });

// Track connection state
let isConnected = false;
let lastError = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Add connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 2 seconds if connection could not be established
});

// Monitor pool events
pool.on('connect', (client) => {
  isConnected = true;
  reconnectAttempts = 0;
  console.log('🎉✅ Successfully connected to the database!');
  
  // Monitor individual client connections
  client.on('notice', msg => {
    console.log('📢 Database Notice:', msg.message);
  });
});

pool.on('error', (err) => {
  isConnected = false;
  lastError = err;
  console.error('🔥❌ Pool Error:', {
    message: err.message,
    code: err.code,
    timestamp: new Date().toISOString()
  });
});

pool.on('remove', (client) => {
  console.log('👋 Client removed from pool');
});

// Health check function
const checkDatabaseHealth = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    if (!isConnected) {
      console.log('🔄 Database connection restored!');
      isConnected = true;
    }
    return true;
  } catch (error) {
    if (isConnected) {
      console.error('📉 Database connection lost!', {
        error: error.message,
        timestamp: new Date().toISOString()
      });
      isConnected = false;
    }
    return false;
  }
};

// Reconnection logic
const attemptReconnection = async () => {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error('❌ Maximum reconnection attempts reached. Please check database configuration.');
    process.exit(1);
  }

  reconnectAttempts++;
  console.log(`🔄 Attempting to reconnect... (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);

  try {
    await pool.query('SELECT 1');
    console.log('✅ Reconnection successful!');
    isConnected = true;
    reconnectAttempts = 0;
  } catch (error) {
    console.error('❌ Reconnection failed:', error.message);
    setTimeout(attemptReconnection, 5000); // Wait 5 seconds before trying again
  }
};

// Pool status checker
const getPoolStatus = () => {
  const status = {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
    isConnected,
    lastError: lastError ? {
      message: lastError.message,
      time: new Date().toISOString()
    } : null
  };
  return status;
};

// Initialize connection and monitoring
(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`🕒 Database connected at: ${res.rows[0].now}`);
    
    // Start periodic health checks
    setInterval(async () => {
      const isHealthy = await checkDatabaseHealth();
      if (!isHealthy && isConnected) {
        attemptReconnection();
      }
    }, 30000); // Check every 30 seconds

  } catch (err) {
    console.error('🚨 Initial connection failed:', {
      error: err.message,
      timestamp: new Date().toISOString(),
      details: err.stack
    });
    process.exit(1);
  }
})();

// Export functions and pool
export default {
  pool,
  getPoolStatus,
  checkDatabaseHealth
};
