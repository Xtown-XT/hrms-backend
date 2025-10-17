// index.js
import app from './src/index.js';
import dotenv from 'dotenv';
import os from 'os';

// ← Add this import:
import { sequelize } from './src/db/index.js';

dotenv.config();

const port = process.env.PORT || 5000;
const host = process.env.HOST || getLocalIP();

// Function to get the local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '0.0.0.0';
}

// Mark the listener callback `async` so you can `await` inside it
app.listen(port, host, async () => {
  try {

    
    //  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); // 🔧 disable temporarily
    // await sequelize.sync({ force: true });
    // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // 🔧 re-enable

    // Ensure DB tables/models are all in place
    await sequelize.sync();
    // await sequelize.sync({ force: true })
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
});
