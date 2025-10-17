import { DataTypes } from "sequelize";
import { xtown } from "../../../db/xtownDb.js"; // make sure this is your xtown connection

const IClockTransaction = xtown.define(
  "iclock_transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    punch_time: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    punch_state: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    verify_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_code: {
      type: DataTypes.STRING(20),
    },
    terminal_sn: {
      type: DataTypes.STRING(50),
    },
    terminal_alias: {
      type: DataTypes.STRING(50),
    },
    area_alias: {
      type: DataTypes.STRING(120),
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    gps_location: {
      type: DataTypes.TEXT("long"),
    },
    mobile: {
      type: DataTypes.STRING(50),
    },
    source: {
      type: DataTypes.SMALLINT,
    },
    purpose: {
      type: DataTypes.SMALLINT,
    },
    emp_id: {
      type: DataTypes.STRING(36),
    },
    company_id: {
      type: DataTypes.CHAR(32),
    },
    upload_time: {
      type: DataTypes.DATE(6),
    },
  },
  {
    tableName: "iclock_transaction",
    timestamps: false,
  }
);

export default IClockTransaction;
