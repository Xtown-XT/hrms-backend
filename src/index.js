import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {responseHelper } from './middleware/index.js';
import path from "path";

// import userRoutes from './user/routes/index.js';
import userRoutes from './modules/user/routes/index.js';
import CompanyAssetRoutes from './modules/companymaster/routes/companyasset.routes.js';
import shiftRoutes from './modules/shiftmaster/routes/shift.routes.js';
import employee from './modules/employee/routes/index.js';
import attendanceRoutes from './modules/Attendancemaster/attendanceroutes/index.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(responseHelper);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get('/', (req, res) => {
  res.send("Hello World!!").status(404);
}
);

app.get('/api/data', (req, res) => {
  res.sendSuccess({ value: 42 }, 'Data fetched successfully');
});

app.get('/api/error', (req, res) => {
  res.sendError('Something went wrong', 422, [{ field: 'email', message: 'Invalid' }]);
});

//routes
app.use('/hrms_api/v1', userRoutes);
app.use('/hrms_api/v1', CompanyAssetRoutes);
app.use('/hrms_api/v1', shiftRoutes);

app.use('/hrms_api/v1', employee)

app.use('/hrms_api/v1', attendanceRoutes);



app.use((req, res) => {
  return res.sendError('Route not found', 404);
});

export default app;