import express from "express";
import {
  createAttendance,
  getAllAttendance,
} from "../controllers/attendance.controllers.js";

import { validate } from "../../../middleware/validate.js";
import {
  createAttendanceSchema,
  getattendanceSchema,
} from "../dto/attandance.zod.js";
import { verify } from "crypto";
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";

const router = express.Router();


// ✅ CREATE attendance
router.post(
  "/createAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(createAttendanceSchema),
  createAttendance
);
router.get("/getAllAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(getattendanceSchema),getAllAttendance)



export default router;
