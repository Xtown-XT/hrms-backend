// // import SequelizePkg from "sequelize";
// // const Sequelize = SequelizePkg; 
// // const { DataTypes, Op } = SequelizePkg;



// // Create Sequelize instance
// const sequelize =new Sequelize("att", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//     dialect: "mysql",
// });

<<<<<<< HEAD
const att =new Sequelize("att", "ramya", "ramya", {
  // host: "192.168.1.150",
  // port: 3306,
    dialect: "mysql",
=======
// // const sequelize =new Sequelize("xtown", "root", "Sanjay@1218", {
// //   host: "127.0.0.1",
// //   port: 3306,
// //     dialect: "mysql",
// // });

// // Authenticate database connection inside async IIFE
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ xtown databse connected successfully");
//   } catch (err) {
//     console.error("❌ Database connection error:", err);
//   }
// })();
// // Export for models/services
// =======


// // const sequelize =new Sequelize("xtown", "ramya", "ramya", {
// //   host: "192.168.1.150",
// //   port: 3306,
// //     dialect: "mysql",
// //
// // // Authenticate database connection inside async IIFE
// // (async () => {
// //   try {
// //     await sequelize.authenticate();
// //     console.log("✅ xtown databse connected successfully");
// //   } catch (err) {
// //     console.error("❌ Database connection error:", err);
// //   }
// // })();
// // =======
// // const sequelize =new Sequelize("xtown", "root", "Sanjay@1218", {
// //   host: "127.0.0.1",
// //   port: 3306,
// //     dialect: "mysql",
// // });
// // export { sequelize, DataTypes, Op };


import SequelizePkg from "sequelize";

const Sequelize = SequelizePkg;
const { DataTypes, Op } = SequelizePkg;

// ✅ Create Sequelize instance for xtown database
const att = new Sequelize("att", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
  logging: false, // optional
>>>>>>> 8d36aa91f99b716b5a8ece877af25aff90b35443
});

// ✅ Authenticate connection
(async () => {
  try {
    await att.authenticate();
<<<<<<< HEAD
    console.log("✅ att databse connected successfully");
=======
    console.log("✅ att database connected successfully");
>>>>>>> 8d36aa91f99b716b5a8ece877af25aff90b35443
  } catch (err) {
    console.error("❌ att Database connection error:", err);
  }
})();

<<<<<<< HEAD
// export { sequelize as xtown, DataTypes, Op };

// 👇 Export sequelize under its original name
=======
>>>>>>> 8d36aa91f99b716b5a8ece877af25aff90b35443
export { att, DataTypes, Op };
