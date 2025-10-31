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





  "/createAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(createAttendanceSchema),
  createAttendance

router.get("/getAllAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(getattendanceSchema),getAllAttendance)




export default router;