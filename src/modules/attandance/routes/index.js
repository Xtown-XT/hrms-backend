import express from "express";
import attendanceRoutes from "./attandance.route.js"

const router = express.Router();
router.use('/attandance', attendanceRoutes);

export default router
