// src/modules/employee/models/employee.model.js
import { DataTypes , Op } from "sequelize";
import { sequelize } from "../../../db/index.js";
// import sequelize, { DataTypes, Op } from "../../../db/xtown.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    emp_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    attendance_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_joining: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reporting_manager: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employee_type: {
      type: DataTypes.ENUM("Permanent", "Contract", "Intern"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
    shift_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "employees",
    timestamps: true,
     paranoid: true, // 👈 enables soft delete
    deletedAt: "deleted_at", // stores timestamp instead of deleting record

     hooks: {
      beforeCreate: async (employee) => {
        if (!employee.emp_id) {
          const year = new Date().getFullYear().toString().slice(-2); // "25"
          const prefix = `XT-${year}-`;

          const lastEmployee = await Employee.findOne({
            where: { emp_id: { [Op.like]: `${prefix}%` } },
            order: [["createdAt", "DESC"]],
          });

          let sequence = 1;
          if (lastEmployee) {
            const lastSeq = parseInt(lastEmployee.emp_id.split("-")[2], 10);
            sequence = lastSeq + 1;
          }

          const paddedSeq = String(sequence).padStart(3, "0");
          employee.emp_id = `${prefix}${paddedSeq}`;
        }
      },
    },
  },
  
);

export default Employee;
