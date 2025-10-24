// import SequelizePkg from "sequelize";
// const Sequelize = SequelizePkg; 
// const { DataTypes, Op } = SequelizePkg;




// const sequelize =new Sequelize("xtown", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//     dialect: "mysql",
//
// // Authenticate database connection inside async IIFE
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ xtown databse connected successfully");
//   } catch (err) {
//     console.error("❌ Database connection error:", err);
//   }
// })();
// =======
// const sequelize =new Sequelize("xtown", "root", "Sanjay@1218", {
//   host: "127.0.0.1",
//   port: 3306,
//     dialect: "mysql",
// });


// export { sequelize, DataTypes, Op };


import SequelizePkg from "sequelize";

const Sequelize = SequelizePkg;
const { DataTypes, Op } = SequelizePkg;

// ✅ Create Sequelize instance for xtown database
const xtown = new Sequelize("xtown", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
  logging: false, // optional
});

// ✅ Authenticate connection
(async () => {
  try {
    await xtown.authenticate();
    console.log("✅ Xtown database connected successfully");
  } catch (err) {
    console.error("❌ Xtown Database connection error:", err);
  }
})();

export { xtown, DataTypes, Op };
