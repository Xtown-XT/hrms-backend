import SequelizePkg from "sequelize";

// Access the Sequelize constructor, DataTypes, and Op
const Sequelize = SequelizePkg; // <-- fix here
const { DataTypes, Op } = SequelizePkg;


// Create Sequelize instance
// const sequelize =new Sequelize("att", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//     dialect: "mysql",
// });

const sequelize =new Sequelize("xtown", "root", "jothi@2114", {
  host: "127.0.0.1",
  port: 3306,
    dialect: "mysql",
});

// Authenticate database connection inside async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ xtown databse connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();
// Export for models/services
// export { sequelize, DataTypes, Op };

// export { sequelize as xtown, DataTypes, Op };

// 👇 Export sequelize under its original name
export { sequelize, DataTypes, Op };
