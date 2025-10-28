import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const PersonnelEmployee = sequelize.define(
  "PersonnelEmployee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    emp_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branch_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "personnel_employee",
    timestamps: false,
    paranoid: false,
  }
);

export default PersonnelEmployee;
