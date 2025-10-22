import { z } from "zod";

export const createDepartmentSchema = z.object({
  body: z.object({
    department_name: z.string().min(1, "Department name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    description: z.string().optional(),
  }),
});

export const updateDepartmentSchema = z.object({
  body: z.object({
    department_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    description: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
  }),
});

export const idSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid department ID"),
  }),
});
