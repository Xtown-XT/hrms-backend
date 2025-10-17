// src/modules/shiftmaster/models/shift.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js"; // ✅ same style as CompanyAsset

const Shift = sequelize.define(
  "Shift",
  {
    shift_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    shift_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    break_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    break_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    total_hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 24,
      },
    },
    minimum_in_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    maximum_out_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "shifts",
    timestamps: true,
    paranoid: true, // ✅ enables soft delete
  }
);

export default Shift;
