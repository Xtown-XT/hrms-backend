import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
   is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references : {
        model : "endusers",
        key : "id"
      }

    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references : {
        model : "endusers",
        key : "id"
      }
    },
  },
  {
    tableName: "departments",
    timestamps: true,
    paranoid: true, // soft delete
    deletedAt: "deleted_at",
  }
);

export default Department;
