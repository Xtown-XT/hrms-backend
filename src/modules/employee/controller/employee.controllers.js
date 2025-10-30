// // // src/modules/employee/controller/employee.controller.js
// // import Employee from "../models/employee.model.js";
// // import BaseService from "../../../services/service.js";
// // import path from "path";
// // const employeeService = new BaseService(Employee);
// // import PersonnelEmployee from "../../attandance/models/personalempolye.models.js";
// // import { Op } from "sequelize";

// // import EmployeeDetails from "../models/employeeDetails.model.js";
// // import EmployeeDocuments from "../models/employeeDocument.model.js";
// // import EmployeeEmergency from "../models/employeeEmergency.model.js";
// // import { sequelize } from "../../../db/index.js";

// // // ============================================================
// // // 🔹 Add Employee Extra Data (details + documents + emergency)
// // // ============================================================
// // export const createEmployee = async (req, res) => {
// //   try {
// //     // 1️⃣ Extract fields safely
// //     const { first_name, last_name, ...otherFields } = req.body;

// //     const payload = {
// //       first_name,
// //       last_name,
// //       ...otherFields,
// //       // profile_picture: req.file
// //       //   ? `/uploads/employees/${req.file.filename}`
// //       //   : null,
// //       profile_picture: req.file ? req.file.filename : null,

// //       created_by: req.user?.id || "system",
// //     };

// //     let attendance_id;

// //     // 2️⃣ Check if employee exists in xtown.personnel_employee
// //     try {
// //       const personnel = await PersonnelEmployee.findOne({
// //         where: { first_name: first_name, last_name: last_name },
// //       });

// //       if (personnel) {
// //         attendance_id = personnel.id; // ✅ Found existing record
// //         console.log("✅ Existing personnel found:", attendance_id);
// //       } else {
// //         // 🆕 Create new record in xtown.personnel_employee
// //         const newPersonnel = await PersonnelEmployee.create({
// //           first_name: first_name,
// //           last_name: last_name,
// //           emp_code: otherFields.emp_id || null,
// //           status: 1,
// //           create_time: new Date(),
// //         });

// //         attendance_id = newPersonnel.id;
// //         console.log("🆕 New personnel created:", attendance_id);
// //       }
// //     } catch (err) {
// //       console.error("❌ xtown lookup failed, using fallback ID:", err);
// //       attendance_id = Date.now();
// //     }

// //     // 3️⃣ Attach attendance_id to payload
// //     payload.attendance_id = attendance_id;

// //     // 4️⃣ Create the employee in hrms_demo
// //     const newEmployee = await employeeService.create(payload);

// //     return res.status(201).json({
// //       message: "Employee added successfully",
// //       data: newEmployee,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in createEmployee:", error);
// //     return res.status(500).json({
// //       message: "Failed to create employee",
// //       error: error.message,
// //     });
// //   }
// // };

// // // PUT /api/employee/:id
// // export const updateEmployee = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const payload = {
// //       ...req.body,
// //       updated_by: req.user?.id || "system",
// //     };

// //      if (req.file) {
// //       payload.profile_picture = req.file.filename; // ✅ only filename
// //     }

// //     const updatedEmployee = await employeeService.update(id, payload);
// //     return res.status(200).json({
// //       message: "Employee updated successfully",
// //       data: updatedEmployee,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in updateEmployee:", error);
// //     return res.status(500).json({
// //       message: "Failed to update employee",
// //       error: error.message,
// //     });
// //   }
// // };


// // // GET /api/employee/all
// // export const getAllEmployees = async (req, res) => {
// //   try {
// //     const options = {
// //       includeInactive: req.query.includeInactive === "true" || false,
// //       search: req.query.search || "",
// //       page: req.query.page || 1,
// //       limit: req.query.limit || 10,
// //       orderBy: req.query.orderBy || "createdAt",
// //       order: req.query.order || "ASC",
// //       searchFields: ["first_name", "last_name", "emp_id", "attendance_id"],
// //     };

// //     const result = await employeeService.getAll(options);
// //     return res.status(200).json({
// //       message: "Employees fetched successfully",
// //       ...result,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in getAllEmployees:", error);
// //     return res.status(500).json({
// //       message: "Failed to fetch employees",
// //       error: error.message,
// //     });
// //   }
// // };

// // // GET /api/employee/:id
// // // export const getEmployeeById = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const employee = await employeeService.getById(id);
// // //     return res.status(200).json({
// // //       message: "Employee fetched successfully",
// // //       data: employee,
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error in getEmployeeById:", error);
// // //     return res.status(500).json({
// // //       message: "Failed to fetch employee",
// // //       error: error.message,
// // //     });
// // //   }
// // // };


// // export const getEmployeeById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const employee = await Employee.findOne({
// //       where: { id },
// //       include: [
// //         {
// //           model: EmployeeDetails,
// //           as: "details",
// //           include: [
// //             { model: Branch, as: "branches", attributes: ["id", "branch_name", "city", "state"] },
// //             { model: Department, as: "departments", attributes: ["id", "department_name"] },
// //             { model: Role, as: "designation", attributes: ["role_id", "role_name"] },
// //           ],
// //         },
// //         {
// //           model: EmployeeDocuments,
// //           as: "documents",
// //           attributes: {
// //             exclude: ["created_by", "updated_by", "deletedAt"],
// //           },
// //         },
// //         {
// //           model: EmployeeEmergency,
// //           as: "emergencies",
// //           attributes: {
// //             exclude: ["created_by", "updated_by", "deletedAt"],
// //           },
// //         },
// //       ],
// //     });

// //     if (!employee) {
// //       return res.status(404).json({ message: "Employee not found" });
// //     }

// //     return res.status(200).json({
// //       message: "Employee fetched successfully",
// //       data: employee,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in getEmployeeById:", error);
// //     return res.status(500).json({
// //       message: "Failed to fetch employee",
// //       error: error.message,
// //     });
// //   }
// // };


// // // DELETE /api/employee/:id
// // export const deleteEmployee = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const result = await employeeService.delete(id);
// //     return res.status(200).json({
// //       message: "Employee deleted successfully",
// //       data: result,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in deleteEmployee:", error);
// //     return res.status(500).json({
// //       message: "Failed to delete employee",
// //       error: error.message,
// //     });
// //   }
// // };


// // // // src/modules/employee/controller/employee.controller.js
// // // export const restoreEmployee = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const employee = await Employee.findOne({
// // //       where: { id },
// // //       paranoid: false, // include soft-deleted records
// // //     });

// // //     if (!employee) {
// // //       return res.status(404).json({ message: "Employee not found" });
// // //     }

// // //     await employee.restore(); // restore the record
// // //     await employee.update({ is_active: true });

// // //     return res.status(200).json({
// // //       message: "Employee restored successfully",
// // //       data: employee,
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ Error in restoreEmployee:", error);
// // //     return res.status(500).json({
// // //       message: "Failed to restore employee",
// // //       error: error.message,
// // //     });
// // //   }
// // // };


// // export const addEmployeeFullInfo = async (req, res) => {
// //   const transaction = await sequelize.transaction();

// //   try {
// //     const { emp_id } = req.body;
// //     if (!emp_id) {
// //       return res.status(400).json({ message: "emp_id is required" });
// //     }

// //     // ---------------------------------------------------------
// //     // 🔹 1. Employee Details
// //     // ---------------------------------------------------------
// //     const detailsData = JSON.parse(req.body.details || "{}");
// //     const employeeDetails = await EmployeeDetails.create(
// //       { ...detailsData, emp_id },
// //       { transaction }
// //     );

// //     // ---------------------------------------------------------
// //     // 🔹 2. Employee Documents
// //     // ---------------------------------------------------------
// //     const docFields = [
// //       "resume",
// //       "aadhar",
// //       "pan",
// //       "degree",
// //       "marksheet",
// //       "relieving",
// //       "experience",
// //       "offer",
// //       "passport",
// //       "driving",
// //       "addressproof",
// //       "bankproof",
// //     ];

// //     const uploadedDocs = {};
// //     docFields.forEach((field) => {
// //       // if (req.files && req.files[field]) {
// //       //   uploadedDocs[field] = req.files[field][0].path;
// //       // }
// //       if (req.files && req.files[field]) {
// //         // 👇 Extract only filename (no folder path)
// //         uploadedDocs[field] = path.basename(req.files[field][0].path);
// //       }
// //     });

// //     const employeeDocuments = await EmployeeDocuments.create(
// //       { emp_id, ...uploadedDocs },
// //       { transaction }
// //     );

// //     // ---------------------------------------------------------
// //     // 🔹 3. Employee Emergency Contacts (Array)
// //     // ---------------------------------------------------------
// //     const emergencyData = JSON.parse(req.body.emergency || "[]");

// //     const employeeEmergencies = await Promise.all(
// //       emergencyData.map((contact) =>
// //         EmployeeEmergency.create({ ...contact, emp_id }, { transaction })
// //       )
// //     );

// //     // ---------------------------------------------------------
// //     // 🔹 Commit Transaction
// //     // ---------------------------------------------------------
// //     await transaction.commit();

// //     return res.status(201).json({
// //       message: "Employee full info added successfully",
// //       data: {
// //         details: employeeDetails,
// //         documents: employeeDocuments,
// //         emergencies: employeeEmergencies,
// //       },
// //     });
// //   } catch (error) {
// //     await transaction.rollback();
// //     console.error("Error adding employee info:", error);
// //     return res.status(500).json({
// //       message: "Error adding employee information",
// //       error: error.message,
// //     });
// //   }
// // };

// // export default {
// //   createEmployee,
// //   getAllEmployees,
// //   getEmployeeById,
// //   updateEmployee,
// //   deleteEmployee,
// //   addEmployeeFullInfo
// // };


// // src/modules/employee/controller/employee.controller.js
// import path from "path";
// import { Op } from "sequelize";
// import { sequelize } from "../../../db/index.js";

// import Employee from "../models/employee.model.js";
// import EmployeeDetails from "../models/employeeDetails.model.js";
// import EmployeeDocuments from "../models/employeeDocument.model.js";
// import EmployeeEmergency from "../models/employeeEmergency.model.js";

// import Branch from "../models/branch.model.js";
// import Department from "../models/department.model.js";
// import Role from "../models/role.model.js";

// import PersonnelEmployee from "../../attandance/models/personalempolye.models.js";
// import BaseService from "../../../services/service.js";

// const employeeService = new BaseService(Employee);

// // ============================================================
// // 🔹 Add Employee
// // ============================================================
// export const createEmployee = async (req, res) => {
//   try {
//     const { first_name, last_name, emp_id, ...otherFields } = req.body;

//     if (!first_name || !last_name) {
//       return res.status(400).json({ message: "First name and last name are required" });
//     }

//     const payload = {
//       first_name,
//       last_name,
//       ...otherFields,
//       profile_picture: req.file ? `/uploads/employees/${req.file.filename}` : null,
//       created_by: req.user?.id || "system",
//     };

//     let attendance_id;

//     try {
//       // Prefer emp_id if exists
//       const personnelWhere = emp_id ? { emp_code: emp_id } : { first_name, last_name };
//       const personnel = await PersonnelEmployee.findOne({ where: personnelWhere });

//       if (personnel) {
//         attendance_id = personnel.id;
//       } else {
//         const newPersonnel = await PersonnelEmployee.create({
//           first_name,
//           last_name,
//           emp_code: emp_id || null,
//           status: 1,
//           create_time: new Date(),
//         });
//         attendance_id = newPersonnel.id;
//       }
//     } catch (err) {
//       attendance_id = Date.now(); // fallback
//     }

//     payload.attendance_id = attendance_id;

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

// // ============================================================
// // 🔹 Update Employee
// // ============================================================
// export const updateEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const payload = {
//       ...req.body,
//       updated_by: req.user?.id || "system",
//     };

//     if (req.file) {
//       payload.profile_picture = `/uploads/employees/${req.file.filename}`;
//     }

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

// // ============================================================
// // 🔹 Get All Employees
// // ============================================================
// export const getAllEmployees = async (req, res) => {
//   try {
//     const options = {
//       includeInactive: req.query.includeInactive === "true",
//       search: req.query.search || "",
//       page: parseInt(req.query.page) || 1,
//       limit: parseInt(req.query.limit) || 10,
//       orderBy: req.query.orderBy || "createdAt",
//       order: req.query.order || "ASC",
//       searchFields: ["first_name", "last_name", "emp_id", "attendance_id"],
//     };

//     const result = await employeeService.getAll(options);

//     return res.status(200).json({
//       message: "Employees fetched successfully",
//       ...result,
//     });
//   } catch (error) {
//     console.error("❌ Error in getAllEmployees:", error);
//     return res.status(500).json({
//       message: "Failed to fetch employees",
//       error: error.message,
//     });
//   }
// };

// // ============================================================
// // 🔹 Get Employee by ID
// // ============================================================
// // GET /api/employee/:id
// export const getEmployeeById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const employee = await Employee.findOne({
//       where: { id },
//       include: [
//         {
//           model: EmployeeDetails,
//           as: "details", // must match Employee -> EmployeeDetails association
//           include: [
//             {
//               model: Branch,
//               as: "branch", // use the alias defined in EmployeeDetails model
//               attributes: ["id", "branch_name", "city", "state"],
//             },
//             {
//               model: Department,
//               as: "department", // alias must match
//               attributes: ["id", "department_name"],
//             },
//             {
//               model: Role,
//               as: "designation", // alias must match
//               attributes: ["role_id", "role_name"],
//             },
//           ],
//         },
//         {
//           model: EmployeeDocuments,
//           as: "documents",
//           attributes: { exclude: ["created_by", "updated_by", "deletedAt"] },
//         },
//         {
//           model: EmployeeEmergency,
//           as: "emergencies",
//           attributes: { exclude: ["created_by", "updated_by", "deletedAt"] },
//         },
//       ],
//     });

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     return res.status(200).json({
//       message: "Employee fetched successfully",
//       data: employee,
//     });
//   } catch (error) {
//     console.error("❌ Error in getEmployeeById:", error);
//     return res.status(500).json({
//       message: "Failed to fetch employee",
//       error: error.message,
//     });
//   }
// };


// // ============================================================
// // 🔹 Delete Employee
// // ============================================================
// export const deleteEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await employeeService.delete(id);

//     return res.status(200).json({
//       message: "Employee deleted successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("❌ Error in deleteEmployee:", error);
//     return res.status(500).json({
//       message: "Failed to delete employee",
//       error: error.message,
//     });
//   }
// };

// // ============================================================
// // 🔹 Add Full Employee Info (details + documents + emergency)
// // ============================================================
// export const addEmployeeFullInfo = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { emp_id } = req.body;
//     if (!emp_id) {
//       return res.status(400).json({ message: "emp_id is required" });
//     }

//     // Parse JSON fields safely
//     const detailsData = req.body.details ? JSON.parse(req.body.details) : {};
//     const emergencyData = req.body.emergency ? JSON.parse(req.body.emergency) : [];

//     // Employee Details
//     const employeeDetails = await EmployeeDetails.create(
//       { ...detailsData, emp_id },
//       { transaction }
//     );

//     // Employee Documents
//     const docFields = [
//       "resume","aadhar","pan","degree","marksheet","relieving","experience",
//       "offer","passport","driving","addressproof","bankproof"
//     ];

//     const uploadedDocs = {};
//     docFields.forEach((field) => {
//       if (req.files && req.files[field]) {
//         uploadedDocs[field] = path.basename(req.files[field][0].path);
//       }
//     });

//     const employeeDocuments = await EmployeeDocuments.create(
//       { emp_id, ...uploadedDocs },
//       { transaction }
//     );

//     // Employee Emergency Contacts
//     const employeeEmergencies = await Promise.all(
//       emergencyData.map((contact) => EmployeeEmergency.create({ ...contact, emp_id }, { transaction }))
//     );

//     await transaction.commit();

//     return res.status(201).json({
//       message: "Employee full info added successfully",
//       data: { details: employeeDetails, documents: employeeDocuments, emergencies: employeeEmergencies },
//     });
//   } catch (error) {
//     await transaction.rollback();
//     console.error("❌ Error adding employee info:", error);
//     return res.status(500).json({
//       message: "Error adding employee information",
//       error: error.message,
//     });
//   }
// };

// export default {
//   createEmployee,
//   updateEmployee,
//   getAllEmployees,
//   getEmployeeById,
//   deleteEmployee,
//   addEmployeeFullInfo,
// };


// src/modules/employee/controller/employee.controller.js
import path from "path";
import { Op } from "sequelize";
import { sequelize } from "../../../db/index.js";

import Employee from "../models/employee.model.js";
import EmployeeDetails from "../models/employeeDetails.model.js";
import EmployeeDocuments from "../models/employeeDocument.model.js";
import EmployeeEmergency from "../models/employeeEmergency.model.js";

import Branch from "../models/branch.model.js";
import Department from "../models/department.model.js";
import Role from "../models/role.model.js";

import PersonnelEmployee from "../../attandance/models/personalempolye.models.js";
import BaseService from "../../../services/service.js";

const employeeService = new BaseService(Employee);

// ============================================================
// 🔹 Create Employee
// ============================================================
// export const createEmployee = async (req, res) => {
//   try {
//     const { first_name, last_name, emp_id, ...otherFields } = req.body;

//     if (!first_name || !last_name) {
//       return res.status(400).json({ message: "First name and last name are required" });
//     }

//     const payload = {
//       first_name,
//       last_name,
//       ...otherFields,
//       profile_picture: req.file ? `/uploads/employees/${req.file.filename}` : null,
//       created_by: req.user?.id || "system",
//     };

//     let attendance_id;

//     try {
//       const personnelWhere = emp_id ? { emp_code: emp_id } : { first_name, last_name };
//       const personnel = await PersonnelEmployee.findOne({ where: personnelWhere });

//       if (personnel) {
//         attendance_id = personnel.id;
//       } else {
//         const newPersonnel = await PersonnelEmployee.create({
//           first_name,
//           last_name,
//           emp_code: emp_id || null,
//           status: 1,
//           create_time: new Date(),
//         });
//         attendance_id = newPersonnel.id;
//       }
//     } catch (err) {
//       attendance_id = Date.now(); // fallback
//     }

//     payload.attendance_id = attendance_id;

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
export const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, emp_id, ...otherFields } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ message: "First name and last name are required" });
    }

    const payload = {
      first_name,
      last_name,
      ...otherFields,
      profile_picture: req.file ? `/uploads/employees/${req.file.filename}` : null,
      created_by: req.user?.id || "system",
    };

    let attendance_id;

    try {
      const personnelWhere = emp_id ? { emp_code: emp_id } : { first_name, last_name };
      const personnel = await PersonnelEmployee.findOne({ where: personnelWhere });

      if (personnel) {
        attendance_id = personnel.id;
      } else {
        const newPersonnel = await PersonnelEmployee.create({
          first_name,
          last_name,
          emp_code: emp_id || null,
          status: 1,
          create_time: new Date(),
        });
        attendance_id = newPersonnel.id;
      }
    } catch (err) {
      // fallback: convert to string so it matches model's STRING/UUID expectations
      attendance_id = String(Date.now());
    }

    payload.attendance_id = attendance_id;

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

// ============================================================
// 🔹 Update Employee
// ============================================================
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

// ============================================================
// 🔹 Get All Employees
// ============================================================
export const getAllEmployees = async (req, res) => {
  try {
    const options = {
      includeInactive: req.query.includeInactive === "true",
      search: req.query.search || "",
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
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

// ============================================================
// 🔹 Get Employee by ID
// ============================================================
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      where: { id },
      include: [
        {
          model: EmployeeDetails,
          as: "details",
          include: [
            { model: Branch, as: "branch", attributes: ["id", "branch_name", "city", "state"] },
            { model: Department, as: "department", attributes: ["id", "department_name"] },
            { model: Role, as: "designation", attributes: ["id", "role_name"] },
          ],
        },
        {
          model: EmployeeDocuments,
          as: "documents",
          attributes: { exclude: ["created_by", "updated_by", "deletedAt"] },
        },
        {
          model: EmployeeEmergency,
          as: "emergencies",
          attributes: { exclude: ["created_by", "updated_by", "deletedAt"] },
        },
      ],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

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

// ============================================================
// 🔹 Delete Employee
// ============================================================
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

// ============================================================
// 🔹 Add Full Employee Info (details + documents + emergency)
// ============================================================
export const addEmployeeFullInfo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { emp_id } = req.body;
    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const detailsData = req.body.details ? JSON.parse(req.body.details) : {};
    const emergencyData = req.body.emergency ? JSON.parse(req.body.emergency) : [];

    // Employee Details
    const employeeDetails = await EmployeeDetails.create(
      { ...detailsData, emp_id },
      { transaction }
    );

    // Employee Documents
    const docFields = [
      "resume","aadhar","pan","degree","marksheet","relieving","experience",
      "offer","passport","driving","addressproof","bankproof"
    ];

    const uploadedDocs = {};
    docFields.forEach((field) => {
      if (req.files && req.files[field]) {
        uploadedDocs[field] = path.basename(req.files[field][0].path);
      }
    });

    const employeeDocuments = await EmployeeDocuments.create(
      { emp_id, ...uploadedDocs },
      { transaction }
    );

    // Employee Emergency Contacts
    const employeeEmergencies = await Promise.all(
      emergencyData.map((contact) => EmployeeEmergency.create({ ...contact, emp_id }, { transaction }))
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Employee full info added successfully",
      data: { details: employeeDetails, documents: employeeDocuments, emergencies: employeeEmergencies },
    });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error adding employee info:", error);
    return res.status(500).json({
      message: "Error adding employee information",
      error: error.message,
    });
  }
};

export default {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  addEmployeeFullInfo,
};
