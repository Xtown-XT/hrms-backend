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
import { verifyToken,authorizeRole } from "../../../middleware/index.js";

const router = express.Router();


// ✅ CREATE attendance
router.post(
  "/createatAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(createAttendanceSchema),
  createAttendance
);
router.get("/getAllAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(getattendanceSchema),getAllAttendance)



export default router;
