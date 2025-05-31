require('dotenv').config();
const { Pool } = require('pg');

// Cấu hình kết nối
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test kết nối
async function testConnection() {
  try {
    console.log('Attempting to connect to PostgreSQL...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);
    
    const client = await pool.connect();
    console.log('Connection successful!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Query result:', result.rows[0]);
    
    client.release();
    console.log('Connection released.');
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    pool.end();
  }
}

testConnection();
