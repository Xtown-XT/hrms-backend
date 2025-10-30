import { DataTypes } from "sequelize";
import {att} from "../../../db/xtown"

const IclockTransaction = att.define(
  "iclock_transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: true,
    },
    terminal_sn: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    terminal_alias: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    area_alias: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    gps_location: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    source: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    purpose: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    crc: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_attendance: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    reserved: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    upload_time: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    sync_status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    sync_time: {
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    emp_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    terminal_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.CHAR(32),
      allowNull: true,
    },
    mask_flag: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
    },
  },
  {
    tableName: "iclock_transaction",
    timestamps: false,
  }
);

export default IclockTransaction;
