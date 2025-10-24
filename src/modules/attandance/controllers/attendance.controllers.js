import { Op } from "sequelize";
import Attendance from "../models/attandance.models.js";
import Employee from "../../employee/models/employee.model.js";
import BaseService from "../../../services/service.js";
import IClockTransaction from "../models/iclocktransaction.models.js";
import PersonnelEmployee from "../models/personalempolye.models.js"; 
import { createAttendanceSchema } from "../dto/attandance.zod.js";

const attendanceService = new BaseService(Attendance, PersonnelEmployee, IClockTransaction);

// 🕒 CONFIG
const OFFICE_START_HOUR = 9; // 9 AM
const ABSENT_THRESHOLD_HOURS = 3; // 3 hours after start → mark absent

// 🧠 Auto-mark absentees if not punched after 12 PM
export const autoMarkAbsentees = async () => {
  try {z
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const thresholdTime = new Date();
    thresholdTime.setHours(OFFICE_START_HOUR + ABSENT_THRESHOLD_HOURS, 0, 0, 0);

    if (now < thresholdTime) return;

    const employees = await Employee.findAll();
    for (const emp of employees) {
      const existing = await Attendance.findOne({
        where: { emp_id: emp.emp_id, attendance_date: today },
      });

      if (!existing) {
        await Attendance.create({
          emp_id: emp.emp_id,
          emp_name: `${emp.first_name} ${emp.last_name}`,
          attendance_date: today,
          status: "absent",
        });
        console.log(`❌ Marked absent: ${emp.first_name} ${emp.last_name}`);
      }
    }
  } catch (err) {
    console.error("Auto absent marking failed:", err.message);
  }
};

// ✅ Create attendance record (sync to both DBs)
export const createAttendance = async (req, res) => {
  try {
    const { emp_id, emp_name, attendance_date, in_time, out_time, status } = req.body;
    const validation = await createAttendanceSchema.safeParseAsync(req.body);
    if (!validation.success){
      return res.status(400).json({ message: validation.error.message})
    }

    // 🟢 Save in HRMS DB
    const hrmsRecord = await Attendance.create({
      emp_id,
      emp_name,
      attendance_date,
      in_time,
      out_time,
      status: status || "present",
    });

    // 🟦 Also save in Xtown DB (IClockTransaction)
    const xtownRecord = await IClockTransaction.create({
      emp_code: emp_id.toString(),
      emp_name,
      punch_time: in_time || new Date(),
      punch_type: "IN", // or OUT — adjust as needed
    });

    return res.status(201).json({
      message: "Attendance created successfully in both databases",
      hrms_record: hrmsRecord,
      xtown_record: xtownRecord,
    });
  } catch (error) {
    console.error("Error creating attendance:", error);
    return res.status(500).json({
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

// ✅ Get all attendance (HRMS + Xtown optional merge)
export const getAllAttendance = async (req, res) => {
  try {
    await autoMarkAbsentees();

    const { filter = "all", status, emp_id, emp_name, search = "", page = 1, limit = 10 } = req.query;

    const where = {};
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    if (filter === "today") where.attendance_date = { [Op.between]: [startOfDay, endOfDay] };
    if (status) where.status = status;
    if (emp_id) where.emp_id = emp_id;
    if (emp_name) where.emp_name = { [Op.like]: `%${emp_name.trim()}%` };

    // 🟢 HRMS attendance
    const hrmsRecords = await Attendance.findAll({ where, limit: parseInt(limit), offset: (page - 1) * limit });
    const xtownRecords = await IClockTransaction.findAll({ limit: parseInt(limit), offset: (page - 1) * limit });

    const summary = {
      totalHRMS: hrmsRecords.length,
      totalXtown: xtownRecords.length,
      presentCount: hrmsRecords.filter(r => r.status === "present").length,
      absentCount: hrmsRecords.filter(r => r.status === "absent").length,
    };

    return res.status(200).json({
      message: "Attendance fetched successfully from both databases",
      summary,
      hrms_data: hrmsRecords,
      xtown_data: xtownRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// ✅ Get attendance by ID (HRMS)
export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await attendanceService.getById(id);
    return res.status(200).json({ message: "Attendance record found", record });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// ✅ Update attendance (sync both DBs)
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // 🟢 Update HRMS DB
    const record = await attendanceService.update(id, data);

    // 🟦 Update Xtown punch (if needed)
    if (data.in_time || data.out_time) {
      await IClockTransaction.create({
        emp_code: record.emp_id.toString(),
        emp_name: record.emp_name,
        punch_time: data.in_time || data.out_time,
        punch_type: data.in_time ? "IN" : "OUT",
      });
    }

    return res.status(200).json({ message: "Attendance updated successfully in both databases", record });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await attendanceService.delete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
