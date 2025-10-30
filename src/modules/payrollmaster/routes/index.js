import express from 'express';
import payrollSlipRoutes from './payrollslip.routes.js';

const router = express.Router();
router.use('/payrollslip', payrollSlipRoutes);

export default router;