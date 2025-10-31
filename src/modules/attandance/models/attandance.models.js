import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Employee from "../../employee/models/employee.model.js";

const Attendance = sequelize.define(
  "attendance",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "employees", // or Employee if you prefer (see note)
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
    time_in: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    time_out: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent", "Leave", "Half-Day"),
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // If you want to explicitly declare deletedAt, use DATE:
    // deletedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    tableName: "attendances", // set to actual DB table name; change to "attendance" if that's the table
    timestamps: true,         // <-- move here (options)
    paranoid: true,           // <-- move here (options)
    underscored: false,       // optional: if you use snake_case columns
  }
);

// Associations
Employee.hasMany(Attendance, { foreignKey: "emp_id", sourceKey: "emp_id" });
Attendance.belongsTo(Employee, { foreignKey: "emp_id", targetKey: "emp_id" });

export default Attendance;
