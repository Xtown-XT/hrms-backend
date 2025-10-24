import express from "express";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
} from "../controllers/attendance.controllers.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createAttendanceSchema,
  deleteAttendanceSchema,
  getAttendanceByIdSchema,
  updateAttendanceSchema,
} from "../dto/attandance.zod.js";

const router = express.Router();

// ✅ GET all attendance
router.get(
  "/getAllAttendance",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  getAllAttendance
);

// ✅ GET attendance by ID
router.get(
  "/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(getAttendanceByIdSchema),
  getAttendanceById
);

// ✅ CREATE attendance
router.post(
  "/createAttendance",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createAttendanceSchema),
  createAttendance
);

// ✅ UPDATE attendance
router.put(
  "/:id",
  verifyToken,
  authorizeRole(["admin"]),
  validate(updateAttendanceSchema),
  updateAttendance
);

// ✅ DELETE attendance
router.delete(
  "/:id",
  verifyToken,
  authorizeRole(["admin"]),
  validate(deleteAttendanceSchema),
  deleteAttendance
);

export default router;
