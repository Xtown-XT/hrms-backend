import { z } from "zod";
import Employee from "../../employee/models/employee.model.js";
import Attendance from  "../models/attandance.models.js"

// Regex for 12-hour time format (HH:mm AM/PM)
const time12hRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

// ---------------- CREATE ----------------
export const createAttendanceSchema = z.
 object({
    emp_id: z.string().uuid("Employee ID must be a valid UUID"),
    emp_name: z.string().min(3, "Employee name must be at least 3 characters"),
    attendance_date: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "attendance_date must be a valid date"),
    time_in: z.string().regex(time12hRegex, "time_in must be in HH:mm AM/PM format").optional(),
    time_out: z.string().regex(time12hRegex, "time_out must be in HH:mm AM/PM format").optional(),
    status: z.enum(["present", "absent", "on Leave"]).optional().default("present"),
  })
  .superRefine(async (data, ctx) => {
    const { emp_id, emp_name, attendance_date } = data;

    // 1️⃣ Check if employee exists
    const employee = await Employee.findOne({ where: { id: emp_id } });
    if (!employee) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid emp_id — no employee found in Employee table",
        path: ["emp_id"],
      });
      return;
    }

    // 2️⃣ Compare name with employee table record
    const dbFullName = `${employee.first_name?.trim() || ""} ${employee.last_name?.trim() || ""}`.trim().toLowerCase();
    const requestName = emp_name.trim().toLowerCase();

    if (dbFullName !== requestName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `emp_name mismatch — this emp_id belongs to "${dbFullName}", not "${emp_name}"`,
        path: ["emp_name"],
      });
      return;
    }

    // 3️⃣ Prevent multiple attendance on the same date
    const dateToCheck = attendance_date || new Date().toISOString().slice(0, 10);
    const normalizedDate = new Date(dateToCheck).toISOString().slice(0, 10);

    const existing = await Attendance.findOne({
      where: { emp_id, attendance_date: normalizedDate },
    });

    if (existing) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Attendance already exists for ${dbFullName} on ${normalizedDate}`,
        path: ["attendance_date"],
      });
    }
  });

// ---------------- UPDATE ----------------
export const updateAttendanceSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID must be a valid UUID"),
  }),
  body: z.object({
    emp_name: z.string().min(3).optional(),
    attendance_date: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "attendance_date must be a valid date"),
    time_in: z.string().regex(time12hRegex, "time_in must be in HH:mm AM/PM format").optional(),
    time_out: z.string().regex(time12hRegex, "time_out must be in HH:mm AM/PM format").optional(),
    status: z.enum(["present", "absent", "on Leave"]).optional(),
  }),
});

// ---------------- GET BY ID ----------------
export const getAttendanceByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID must be a valid UUID"),
  }),
});

// ---------------- DELETE ----------------
export const deleteAttendanceSchema = z.object({
  params: z.object({
    id: z.string().uuid("ID must be a valid UUID"),
  }),
});
