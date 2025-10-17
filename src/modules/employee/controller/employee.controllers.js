// src/modules/employee/controller/employee.controller.js
import Employee from "../models/employee.model.js";
import BaseService from "../../../services/service.js";
import path from "path";
const employeeService = new BaseService(Employee);

// POST /api/employee/create
export const createEmployee = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      profile_picture: req.file
        ? `/uploads/employees/${req.file.filename}`
        : null,
      created_by: req.user?.id || "system",
    };

    const newEmployee = await employeeService.create(payload);
    return res.status(201).json({
      message: "Employee added successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("❌ Error in createEmployee:", error);
    return res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

// POST /api/employee/create
// export const createEmployee = async (req, res) => {
//   try {
//     // 1️⃣ Extract payload
//     const payload = {
//       ...req.body,
//       profile_picture: req.file
//         ? `/uploads/employees/${req.file.filename}`
//         : null,
//       created_by: req.user?.id || "system",
//     };

//     // 2️⃣ Attendance logic
//     let attendance_id;
//     try {
//       const personnel = await PersonnelEmployee.findOne({
//         where: {
//           first_name: payload.emp_fname,
//           last_name: payload.emp_lname,
//         },
//       });

//       if (personnel) {
//         attendance_id = personnel.id; // existing record from xtown DB
//       } else {
//         attendance_id = Date.now(); // fallback numeric ID
//       }
//     } catch (err) {
//       console.error("❌ xtown lookup failed, generating numeric ID:", err);
//       attendance_id = Date.now();
//     }

//     // Add attendance_id to payload
//     payload.attendance_id = attendance_id;

//     // 3️⃣ Create employee using service
//     const newEmployee = await employeeService.create(payload);

//     return res.status(201).json({
//       message: "Employee added successfully",
//       data: newEmployee,
//     });
//   } catch (error) {
//     console.error("❌ Error in createEmployee:", error);
//     return res.status(500).json({
//       message: "Failed to create employee",
//       error: error.message,
//     });
//   }
// };


// PUT /api/employee/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      updated_by: req.user?.id || "system",
    };

    if (req.file) {
      payload.profile_picture = `/uploads/employees/${req.file.filename}`;
    }

    const updatedEmployee = await employeeService.update(id, payload);
    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("❌ Error in updateEmployee:", error);
    return res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
};



// // POST /api/employee/create
// export const createEmployee = async (req, res) => {
//   try {
//     const payload = {
//       ...req.body,
//       created_by: req.user?.id || "system",
//     };

//     const newEmployee = await employeeService.create(payload);
//     return res.status(201).json({
//       message: "Employee added successfully",
//       data: newEmployee,
//     });
//   } catch (error) {
//     console.error("❌ Error in createEmployee:", error);
//     return res.status(500).json({
//       message: "Failed to create employee",
//       error: error.message,
//     });
//   }
// };

// GET /api/employee/all
export const getAllEmployees = async (req, res) => {
  try {
    const options = {
      includeInactive: req.query.includeInactive === "true" || false,
      search: req.query.search || "",
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      orderBy: req.query.orderBy || "createdAt",
      order: req.query.order || "ASC",
      searchFields: ["first_name", "last_name", "emp_id", "attendance_id"],
    };

    const result = await employeeService.getAll(options);
    return res.status(200).json({
      message: "Employees fetched successfully",
      ...result,
    });
  } catch (error) {
    console.error("❌ Error in getAllEmployees:", error);
    return res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

// GET /api/employee/:id
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getById(id);
    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    console.error("❌ Error in getEmployeeById:", error);
    return res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message,
    });
  }
};

// PUT /api/employee/:id
// export const updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = {
//       ...req.body,
//       updated_by: req.user?.id || "system",
//     };
//     const updatedEmployee = await employeeService.update(id, payload);
//     return res.status(200).json({
//       message: "Employee updated successfully",
//       data: updatedEmployee,
//     });
//   } catch (error) {
//     console.error("❌ Error in updateEmployee:", error);
//     return res.status(500).json({
//       message: "Failed to update employee",
//       error: error.message,
//     });
//   }
// };

// DELETE /api/employee/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.delete(id);
    return res.status(200).json({
      message: "Employee deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error in deleteEmployee:", error);
    return res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};


// // src/modules/employee/controller/employee.controller.js
// export const restoreEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const employee = await Employee.findOne({
//       where: { id },
//       paranoid: false, // include soft-deleted records
//     });

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     await employee.restore(); // restore the record
//     await employee.update({ is_active: true });

//     return res.status(200).json({
//       message: "Employee restored successfully",
//       data: employee,
//     });
//   } catch (error) {
//     console.error("❌ Error in restoreEmployee:", error);
//     return res.status(500).json({
//       message: "Failed to restore employee",
//       error: error.message,
//     });
//   }
// };


export default {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
