// src/modules/attandance/routes/attendance.routes.js
import express from "express";
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, updateAttendance } from "../Attendancecontrollers/attendance.controllers";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import { createShiftSchema } from "../../shiftmaster/dto/shift.zod.js";
import { deleteAttendanceSchema, getAttendanceByIdSchema, updateAttendanceSchema } from "../dot/zod.js";


const router = express.Router();

router.get("/add", getAllAttendance, verifyToken ,authorizeRole , validate(["admin", "superadmin", "user"]));
router.get("/:id", getAttendanceById, verifyToken ,authorizeRole, validate,getAttendanceByIdSchema(["admin", "superadmin", "user"]));
router.post("/", createAttendance, verifyToken ,authorizeRole,validate, createShiftSchema (["admin", "superadmin", "user"]));
router.put("/:id", updateAttendance, verifyToken ,authorizeRole, validate, updateAttendanceSchema (["admin"]));
router.delete("/:id", deleteAttendance, verifyToken ,authorizeRole, validate,deleteAttendanceSchema(["admin"]));

export default router;
