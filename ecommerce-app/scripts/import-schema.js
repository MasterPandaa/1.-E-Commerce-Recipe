require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  const sqlPath = path.resolve(__dirname, '../database/schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  let conn;
  try {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USER || 'root';
    conn = await mysql.createConnection({
      host,
      port,
      user,
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    await conn.query(sql);
    console.log('Database schema imported successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to import schema:', err && (err.stack || err.message || JSON.stringify(err)));
    console.error('Connection details used (excluding password):', {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
    });
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
})();
