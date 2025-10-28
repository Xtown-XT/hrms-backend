import { DataTypes } from "sequelize";
import { att } from "../../../db/xtown.js";

const IClockTransaction = att.define(
  "iclock_transaction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emp_id: { type: DataTypes.STRING(36), allowNull: true },
    emp_code: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "UNKNOWN" },
    punch_time: { type: DataTypes.DATE(6), allowNull: false },
    punch_state: { type: DataTypes.STRING(5), allowNull: false, defaultValue: "IN" },
    verify_type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    is_attendance: { type: DataTypes.SMALLINT, allowNull: true },
  },
  {
    tableName: "iclock_transaction",
    timestamps: false,
    paranoid: false,
  }
);

export default IClockTransaction;
