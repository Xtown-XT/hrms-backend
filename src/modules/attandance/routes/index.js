// src/modules/index.js
import express from "express";
import attendanceRoutes from "./attandance.route.js";
import addonduttyRoutes from "./ondutty.route.js"; 
import LeaveRoutes from "./leave.routes.js";
import overtimeRoutes from "./overtime.route.js"


const router = express.Router();

// ✅ Attendance routes
router.use("/attendance", attendanceRoutes);

// ✅ Overtime routes
router.use("/addondutty", addonduttyRoutes);

// ✅ Overtime routes
router.use("/overtime", overtimeRoutes);

//  ✅ Leave routes
router.use("/leave", LeaveRoutes);

export default router;
