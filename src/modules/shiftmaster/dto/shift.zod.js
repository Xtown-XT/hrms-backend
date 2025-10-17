// shift.zod.js
// 
import { z } from "zod";

// Time regex HH:mm
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// ✅ Create Shift Schema
export const createShiftSchema = z.object({
  body: z.object({
    shift_name: z.string().min(3, "Shift name must be at least 3 characters"),
    start_time: z.string().regex(timeRegex, "Invalid start time (HH:mm)"),
    end_time: z.string().regex(timeRegex, "Invalid end time (HH:mm)"),
    break_start_time: z.number().int().min(0, "Break minutes must be >= 0"),
    break_end_time: z.number().int().min(0, "Break minutes must be >= 0"),
    total_hours: z
      .number()
      .min(0, "Working hours must be >= 0")
      .max(24, "Working hours must be <= 24"),
    minimum_in_time: z.number().int().min(0, "Minimum in time must be >= 0"),
    maximum_out_time: z.number().int().min(0, "Maximum out time must be >= 0"),
    is_active: z.boolean().optional().default(true),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Update Shift Schema (all fields optional)
export const updateShiftSchema = z.object({
  body: z.object({
    shift_name: z.string().min(3).optional(),
    start_time: z.string().regex(timeRegex).optional(),
    end_time: z.string().regex(timeRegex).optional(),
    break_start_time: z.number().int().min(0).optional(),
    break_end_time: z.number().int().min(0).optional(),
    total_working_hours: z.number().min(0).max(24).optional(),
    minimum_in_time: z.number().int().min(0).optional(),
    maximum_out_time: z.number().int().min(0).optional(),
    is_active: z.boolean().optional(),
    created_by: z.string().optional(),
    updated_by: z.string().optional(),
  }),
});

// ✅ Validate Shift ID
export const idScheme = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export const idSchema = z.object({
  params: idScheme,
});

// ✅ Delete Shift Schema
export const deleteShiftSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID format"),
  }),
});
