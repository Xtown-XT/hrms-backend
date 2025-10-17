// src/modules/index.js
import express from "express";
import employeeRoutes from "./employee.route.js";

const router = express.Router();

router.use("/employee", employeeRoutes);

export default router;
