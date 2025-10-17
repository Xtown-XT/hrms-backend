import { z } from "zod";

// Regex for 12-hour time format (HH:mm AM/PM)
const time12hRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

// ---------------- CREATE ----------------
export const createAttendanceSchema = z.object({
  body: z.object({
    emp_id: z.string().uuid("Employee ID must be a valid UUID"),
    emp_name: z.string().min(3, "Employee name must be at least 3 characters"),
    attendance_date: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), "attendance_date must be a valid date"),
    time_in: z.string().regex(time12hRegex, "time_in must be in HH:mm AM/PM format").optional(),
    time_out: z.string().regex(time12hRegex, "time_out must be in HH:mm AM/PM format").optional(),
    status: z.enum(["present", "absent", "on Leave"]).optional().default("present"),
  }),
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
