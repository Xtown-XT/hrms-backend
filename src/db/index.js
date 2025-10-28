
// import SequelizePkg from "sequelize";

// // Access the Sequelize constructor, DataTypes, and Op
// const Sequelize = SequelizePkg; // <-- fix here
// const { DataTypes, Op } = SequelizePkg;

// const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });


// // Authenticate database connection inside async IIFE
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connected successfully");
//   } catch (err) {
//     console.error("❌ Database connection error:", err);
//   }
// })();

// // Export for models/services
// export { sequelize, DataTypes, Op };




import SequelizePkg from "sequelize";

// Access the Sequelize constructor, DataTypes, and Op
const Sequelize = SequelizePkg; // <-- fix here
const { DataTypes, Op } = SequelizePkg;

// const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
//   host: "192.168.1.150",
const sequelize = new Sequelize("hrms", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
});

// const sequelize = new Sequelize("hrmsback", "root", "Sanjay@1218", {
//   host: "127.0.0.1",
// >>>>>>> e9e9594d5c4e809b64e215c564076b51b5ef198f
//   port: 3306,
//   dialect: "mysql",
// });

// Authenticate database connection inside async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

// Export for models/services
export { sequelize, DataTypes, Op };
