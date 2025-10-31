import SequelizePkg from "sequelize";

const Sequelize = SequelizePkg;
const { DataTypes, Op } = SequelizePkg;

// ✅ Create Sequelize instance for xtown database
const att = new Sequelize("att", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
  logging: false, // optional
});

// ✅ Authenticate connection
(async () => {
  try {
    await att.authenticate();
    console.log("✅ att database connected successfully");
  } catch (err) {
    console.error("❌ att Database connection error:", err);
  }
})();

export { att, DataTypes, Op };
