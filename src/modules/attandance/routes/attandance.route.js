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
<<<<<<< HEAD
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




=======
  "/createAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(createAttendanceSchema),
  createAttendance
);
router.get("/getAllAttendance",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(getattendanceSchema),getAllAttendance)
>>>>>>> 8827d08c6e1d3d4aaba504c8735c5973a93e81ad



export default router;
