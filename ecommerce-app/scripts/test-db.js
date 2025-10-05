require('dotenv').config();
const { testConnection } = require('../src/config/database');

(async () => {
  try {
    const ok = await testConnection();
    if (ok) {
      console.log('DB connection OK');
      process.exit(0);
    } else {
      console.error('DB connection test failed');
      process.exit(2);
    }
  } catch (err) {
    console.error('DB test error:', err.message);
    process.exit(1);
  }
})();
