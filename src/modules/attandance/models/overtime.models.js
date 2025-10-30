import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Employee from "../../employee/models/employee.model.js"
import Attendance from "../models/attandance.models.js" // ✅ Missing import added

const Overtime = sequelize.define(
  "Overtime",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    attendance_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "attendance",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    emp_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "employees", 
        key: "emp_id",
      },
    },
    emp_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    ot_hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "overtime",
    timestamps: true,
  }
);

// ✅ Associations
Employee.hasMany(Overtime, { foreignKey: "emp_id", sourceKey: "emp_id" });
Overtime.belongsTo(Employee, { foreignKey: "emp_id", targetKey: "emp_id" });

Attendance.hasMany(Overtime, { foreignKey: "attendance_id" });
Overtime.belongsTo(Attendance, { foreignKey: "attendance_id" });

export default Overtime;
