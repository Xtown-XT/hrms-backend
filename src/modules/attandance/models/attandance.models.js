// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";
// // import Employee from "../../employee/models/employemodels.js";

// // Convert 12-hour format to 24-hour safely
// function convertTo24Hour(timeStr) {
//   if (!timeStr || typeof timeStr !== "string") return null;
//   const [time, modifier] = timeStr.trim().split(" ");
//   if (!time || !modifier) return null;

//   let [hours, minutes] = time.split(":").map(Number);
//   if (isNaN(hours) || isNaN(minutes)) return null;

//   if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
//   if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

//   return `${hours.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")}:00`;
// }

// // Convert 24-hour format to 12-hour
// export function formatTo12Hour(timeStr) {
//   if (!timeStr) return null;
//   const [hours, minutes] = timeStr.split(":").map(Number);
//   const suffix = hours >= 12 ? "PM" : "AM";
//   const hour12 = hours % 12 === 0 ? 12 : hours % 12;
//   return `${hour12.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")} ${suffix}`;
// }

// // ✅ Attendance Model
// const Attendance = sequelize.define(
//   "Attendance",
//   {
//     attendance_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     emp_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: { model: "employees", key: "emp_id" },
//       onDelete: "CASCADE",
//     },
//     emp_name: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     attendance_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     time_in: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     time_out: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("present", "absent", "on Leave"),
//       allowNull: false,
//       defaultValue: "present",
//     },
//   },
//   {
//     tableName: "attendance_log",
//     timestamps: true,
//     paranoid: true,
//     hooks: {
//       beforeCreate: (att) => {
//         att.time_in = convertTo24Hour(att.time_in);
//         att.time_out = convertTo24Hour(att.time_out);
//       },
//       beforeUpdate: (att) => {
//         att.time_in = convertTo24Hour(att.time_in);
//         att.time_out = convertTo24Hour(att.time_out);
//       },
//     },
//   }
// );

// Attendance.belongsTo(Employee, { foreignKey: "emp_id" });

// export default Attendance;
  

// import { DataTypes } from "sequelize";
// import { sequelize } from "../../../db/index.js";
// import Employee from "../../employee/models/employee.model.js";

// /** Convert 12-hour to 24-hour format **/
// function convertTo24Hour(timeStr) {
//   if (!timeStr || typeof timeStr !== "string") return null;
//   const [time, modifier] = timeStr.trim().split(" ");
//   if (!time || !modifier) return null;

//   let [hours, minutes] = time.split(":").map(Number);
//   if (isNaN(hours) || isNaN(minutes)) return null;

//   if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
//   if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

//   return `${hours.toString().padStart(2, "0")}:${minutes
//     .toString()
//     .padStart(2, "0")}:00`;
// }

// /** Calculate overtime (OT) in hours **/
// function calculateOvertime(timeIn, timeOut) {
//   if (!timeIn || !timeOut) return 0;
//   const start = new Date(`1970-01-01T${timeIn}Z`);
//   const end = new Date(`1970-01-01T${timeOut}Z`);
//   const diffHrs = (end - start) / (1000 * 60 * 60);
//   const standardHours = 9; // Default working hours
//   return diffHrs > standardHours ? diffHrs - standardHours : 0;
// }

// const Attendance = sequelize.define(
//   "Attendance",
//   {
//     attendance_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     emp_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       // references: { model: "employees", key: "emp_id" },
//       // onDelete: "CASCADE",
//     },
//     emp_name: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     attendance_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//     time_in: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     time_out: {
//       type: DataTypes.TIME,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("present", "absent", "on Leave"),
//       allowNull: false,
//       defaultValue: "present",
//     },
//     overtime_hours: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//       defaultValue: 0,
//     },
//   },
//   {
//     tableName: "attendance_log",
//     timestamps: true,
//     paranoid: true,
//     hooks: {
//       beforeCreate: (att) => {
//         att.time_in = convertTo24Hour(att.time_in);
//         att.time_out = convertTo24Hour(att.time_out);
//         att.overtime_hours = calculateOvertime(att.time_in, att.time_out);
//       },
//       beforeUpdate: (att) => {
//         att.time_in = convertTo24Hour(att.time_in);
//         att.time_out = convertTo24Hour(att.time_out);
//         att.overtime_hours = calculateOvertime(att.time_in, att.time_out);
//       },
//     },
//   }
// );

// Attendance.belongsTo(Employee, { foreignKey: "emp_id", targetKey: "id" });

// export default Attendance;
// src/modules/attendance/models/attendance.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Employee from "../../employee/models/employee.model.js";

/** Convert 12-hour to 24-hour format **/
function convertTo24Hour(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null;
  const [time, modifier] = timeStr.trim().split(" ");
  if (!time || !modifier) return null;

  let [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  if (modifier.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;
}

/** Calculate overtime (OT) in hours **/
function calculateOvertime(timeIn, timeOut) {
  if (!timeIn || !timeOut) return 0;
  const start = new Date(`1970-01-01T${timeIn}Z`);
  const end = new Date(`1970-01-01T${timeOut}Z`);
  const diffHrs = (end - start) / (1000 * 60 * 60);
  const standardHours = 9; // Default working hours
  return diffHrs > standardHours ? diffHrs - standardHours : 0;
}

const Attendance = sequelize.define(
  "Attendance",
  {
    attendance_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.UUID,
    
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },

    },
    emp_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
      type: DataTypes.ENUM("present", "absent", "on Leave"),
      allowNull: false,
      defaultValue: "present",
    },
    overtime_hours: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "attendance_log",
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: (att) => {
        att.time_in = convertTo24Hour(att.time_in);
        att.time_out = convertTo24Hour(att.time_out);
        att.overtime_hours = calculateOvertime(att.time_in, att.time_out);
      },
      beforeUpdate: (att) => {
        att.time_in = convertTo24Hour(att.time_in);
        att.time_out = convertTo24Hour(att.time_out);
        att.overtime_hours = calculateOvertime(att.time_in, att.time_out);
      },
    },
  }
);

// 🔑 Fixed foreign key: emp_id references Employee.id
Attendance.belongsTo(Employee, { foreignKey: "emp_id", targetKey: "id" });

export default Attendance;

