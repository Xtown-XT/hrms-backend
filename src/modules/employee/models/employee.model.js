// src/modules/employee/models/employee.model.js
import { DataTypes, Op } from "sequelize";
import { sequelize } from "../../../db/index.js";

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
      allowNull: true,
      unique: true,
    },
    attendance_id: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "endusers",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "endusers",
        key: "id",
      },
    },
  },
  {
    tableName: "employees",
    timestamps: true,
    paranoid: true, // enables soft delete
    deletedAt: "deleted_at",

    // hooks: {
    //   beforeCreate: async (employee) => {
    //     if (!employee.emp_id) {
    //       const year = new Date().getFullYear().toString().slice(-2); // e.g. "25"
    //       const prefix = `XT-${year}-`;

    //       const lastEmployee = await Employee.findOne({
    //         where: { emp_id: { [Op.like]: `${prefix}%` } },
    //         order: [["createdAt", "DESC"]],
    //       });

    //       let sequence = 1;
    //       if (lastEmployee) {
    //         const lastSeq = parseInt(lastEmployee.emp_id.split("-")[2], 10);
    //         sequence = lastSeq + 1;
    //       }

    //       const paddedSeq = String(sequence).padStart(3, "0");
    //       employee.emp_id = `${prefix}${paddedSeq}`;
    //     }
    //   },
    // },

    hooks: {
  beforeCreate: async (employee) => {
    if (!employee.emp_id) {
      const year = new Date().getFullYear().toString().slice(-2); // e.g. "25"
      const prefix = `XT-${year}-`;

      // Find highest existing emp_id for this year
      const lastEmployee = await Employee.findOne({
        where: { emp_id: { [Op.like]: `${prefix}%` } },
        order: [["createdAt", "DESC"]],
        paranoid: false, // include soft-deleted records too
      });

      let sequence = 1;
      if (lastEmployee) {
        const lastSeq = parseInt(lastEmployee.emp_id.split("-")[2], 10);
        if (!isNaN(lastSeq)) sequence = lastSeq + 1;
      }

      // Retry until unique emp_id found
      let unique = false;
      while (!unique) {
        const paddedSeq = String(sequence).padStart(3, "0");
        const newEmpId = `${prefix}${paddedSeq}`;

        const exists = await Employee.findOne({ where: { emp_id: newEmpId }, paranoid: false });
        if (!exists) {
          employee.emp_id = newEmpId;
          unique = true;
        } else {
          sequence++;
        }
      }
    }
  },
}

  }
);

export default Employee;
