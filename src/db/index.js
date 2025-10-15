// // // import { Sequelize } from "sequelize";

// // import pkg from 'sequelize';
// // const { Sequelize } = pkg;

// // const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
// //   host: "192.168.1.150",
// //   port: 3306,
// //   dialect: "mysql",
// // });

// // sequelize
// //   .authenticate()
// //   .then(() => console.log("Database is Connected"))
// //   .catch((err) => console.error(`Database connection error: ${err}`));


// // export { sequelize };




// import SequelizePkg from "sequelize";

// const { Sequelize, DataTypes, Op } = SequelizePkg;

// const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
//   host: "192.168.1.150",
//   port: 3306,
//   dialect: "mysql",
// });

// sequelize
//   .authenticate()
//   .then(() => console.log("Database is Connected"))
//   .catch((err) => console.error(`Database connection error: ${err}`));

// export { sequelize, Sequelize, DataTypes, Op };


import sequelizePkg from "sequelize";
const Sequelize = sequelizePkg.Sequelize; // ✅ Correct constructor reference
const { DataTypes, Op } = sequelizePkg;

const sequelize = new Sequelize("hrms_demo", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ Database connection error:", err);
}

export { sequelize, Sequelize, DataTypes, Op };
