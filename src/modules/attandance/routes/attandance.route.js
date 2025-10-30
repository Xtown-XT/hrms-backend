import express from "express";
import {
  createAttendance,
  getAllAttendance,
  // getbyId,
  // deleteAttendance,
  // getAllAttendance,
  // getAttendanceById,
  // updateAttendance,
} from "../controllers/attendance.controllers.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createAttendanceSchema,
  getattendanceSchema,
  // deleteAttendanceSchema,
  // getAttendanceByIdSchema,
  // updateAttendanceSchema,
} from "../dto/attandance.zod.js";

const router = express.Router();

// // ✅ GET all attendance
// router.get(
//   "/getAllAttendance",
//   verifyToken,
//   authorizeRole(["admin", "superadmin", "user"]),
//   getAllAttendance
// );

// // // ✅ GET attendance by ID
// // router.get(
//   "/:id",
//   verifyToken,
//   authorizeRole(["admin", "superadmin", "user"]),
//   validate(getAttendanceByIdSchema),
// //   getAttendanceById
// // );

// ✅ CREATE attendance
router.post(
  "/createAttendance",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createAttendanceSchema),
  createAttendance
);
router.get("/getAllAttendance", verifyToken,authorizeRole(["admin","superadmin","user"]), validate(getattendanceSchema),getAllAttendance)
// router.get("/getbyId/:id",)
// validate(),getbyId
// // // ✅ UPDATE attendance
// // router.put(
// //   "/:id",
// //   verifyToken,
// //   authorizeRole(["admin"]),
// //   validate(updateAttendanceSchema),
// //   updateAttendance
// // );

// // // ✅ DELETE attendance
// // router.delete(
// //   "/:id",
// //   verifyToken,
// //   authorizeRole(["admin"]),
// //   validate(deleteAttendanceSchema),
// //   deleteAttendance
// // );

// attendance records
// router.get("/attandance",validate(getattendanceSchema),getAllrecords)







export default router;
