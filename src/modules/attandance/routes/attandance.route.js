// // src/modules/attandance/routes/attendance.routes.js
// import express from "express";
// import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, updateAttendance } from "../controllers/attendance.controllers.js";
// import { verifyToken, authorizeRole } from "../../../middleware/index.js";
// import { validate } from "../../../middleware/validate.js";
// import { createShiftSchema } from "../../shiftmaster/dto/shift.zod.js";
// import { deleteAttendanceSchema, getAttendanceByIdSchema, updateAttendanceSchema } from "../dto/attandance.zod.js";


// const router = express.Router();

// router.get("/add", getAllAttendance, verifyToken ,authorizeRole , validate(["admin", "superadmin", "user"]));
// // router.get("/:id", getAttendanceById, verifyToken ,authorizeRole, validate,getAttendanceByIdSchema(["admin", "superadmin", "user"]));
// router.get(
//   "/:id",
//   verifyToken,
//   authorizeRole(["admin", "superadmin", "user"]),
//   validate(getAttendanceByIdSchema),
//   getAttendanceById
// );
// // router.post("/", createAttendance, verifyToken ,authorizeRole,validate, createShiftSchema (["admin", "superadmin", "user"]));
// router.post("/", verifyToken, authorizeRole(["admin", "superadmin", "user"]), validate(createShiftSchema), createAttendance);

// router.put("/:id", updateAttendance, verifyToken ,authorizeRole, validate, updateAttendanceSchema (["admin"]));
// router.delete("/:id", deleteAttendance, verifyToken ,authorizeRole, validate,deleteAttendanceSchema(["admin"]));

// export default router;


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

router.get(
  "/add",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(getAttendanceByIdSchema),
  getAllAttendance
);

router.get(
  "/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(getAttendanceByIdSchema),
  getAttendanceById
);

router.post(
  "/",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createAttendanceSchema),
  createAttendance
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole(["admin"]),
  validate(updateAttendanceSchema),
  updateAttendance
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole(["admin"]),
  validate(deleteAttendanceSchema),
  deleteAttendance
);

export default router;
