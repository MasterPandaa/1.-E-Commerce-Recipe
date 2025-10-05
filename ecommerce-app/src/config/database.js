require('dotenv').config()
const mysql = require('mysql2/promise')

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  queueLimit: 0
})

// Eagerly attempt a connection to surface configuration issues early
pool
  .getConnection()
  .then((conn) => {
    conn.release()
  })
  .catch((err) => {
    console.error('MySQL pool connection error:', err.message)
  })

// Simple helper to test connection with a trivial query
async function testConnection () {
  const conn = await pool.getConnection()
  try {
    const [rows] = await conn.query('SELECT 1 AS result')
    return rows && rows[0] && rows[0].result === 1
  } finally {
    conn.release()
  }
}

module.exports = { pool, testConnection }
