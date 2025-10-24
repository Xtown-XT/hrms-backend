// src/modules/attendance/models/iclocktransaction.model.js
import { DataTypes } from "sequelize";
import { xtown } from "../../../db/xtown.js";

const IClockTransaction = xtown.define(
  "iclock_transaction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emp_id: { type: DataTypes.UUID,  allowNull: true },
    // emp_code: { type: DataTypes.STRING, allowNull: true },
    emp_name: { type: DataTypes.STRING(50), allowNull: false },
    punch_time: { type: DataTypes.DATE, allowNull: false },
    punch_state: { type: DataTypes.STRING(10), defaultValue: "IN" },
    verify_type: { type: DataTypes.INTEGER, defaultValue: 1 },
    longitude: { type: DataTypes.DOUBLE },
    latitude: { type: DataTypes.DOUBLE },
    mobile: { type: DataTypes.STRING(20) },
    company_id: { type: DataTypes.STRING(20) },
    upload_time: { type: DataTypes.DATE },
  },
  {
    tableName: "iclock_transaction",
    timestamps: false,
  }
);

export default IClockTransaction;
