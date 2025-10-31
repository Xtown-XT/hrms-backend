import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { responseHelper } from './middleware/index.js';
// import moduleRoutes from "./modules/index.js";


import userRoutes from './modules/user/routes/index.js';
import employeeRoutes from './modules/employee/routes/index.js';
import shiftRoutes from './modules/shiftmaster/routes/index.js';
<<<<<<< HEAD
import employee from './modules/employee/routes/index.js'
// import attendanceRoutes from './modules/attandance/routes/index.js';
=======
import attendanceRoutes from './modules/attandance/routes/index.js'
>>>>>>> 8d36aa91f99b716b5a8ece877af25aff90b35443

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(responseHelper);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get('/', (req, res) => {
  res.status(200).send("✅ HRMS API Running Successfully");
});

// Test routes
app.get('/api/data', (req, res) => {
  res.sendSuccess({ value: 42 }, 'Data fetched successfully');
});

app.get('/api/error', (req, res) => {
  res.sendError('Something went wrong', 422, [{ field: 'email', message: 'Invalid' }]);
});

app.use('/hrms_api/v1', userRoutes);

app.use('/hrms_api/v1', shiftRoutes);

<<<<<<< HEAD
app.use('/hrms_api/v1', employee)


=======
app.use('/hrms_api/v1', employeeRoutes);
>>>>>>> 8d36aa91f99b716b5a8ece877af25aff90b35443

app.use('/hrms_api/v1',attendanceRoutes);
// app.use("/hrms_api/v1", moduleRoutes);


app.use((req, res) => {
  return res.sendError('Route not found', 404);
});

export default app;
