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
//       const personalemp = emp_id ? { emp_code: emp_id } : { first_name, last_name };
//       const personnel = await PersonnelEmployee.findOne({ where: personalemp });

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
      // 🔍 Find PersonnelEmployee by first_name only
      const personnel = await PersonnelEmployee.findOne({
        where: { first_name },
      });

      if (personnel) {
        attendance_id = personnel.id; // ✅ match found
      } else {
        attendance_id = Date.now().toString(); // ❌ no match → random id
      }
    } catch (err) {
      console.error("Error while fetching PersonnelEmployee:", err);
      attendance_id = Date.now().toString(); // fallback
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
// export const addEmployeeFullInfo = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { emp_id } = req.body;
//     if (!emp_id) {
//       return res.status(400).json({ message: "emp_id is required" });
//     }

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

export const addEmployeeFullInfo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { emp_id } = req.body;
    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const detailsData = req.body.details ? JSON.parse(req.body.details) : {};
    const emergencyData = req.body.emergency ? JSON.parse(req.body.emergency) : [];

    const userId = req.user.id; // <-- from token

    // Employee Details
    const employeeDetails = await EmployeeDetails.create(
      { ...detailsData, emp_id, created_by: userId, updated_by: userId },
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
      { emp_id, ...uploadedDocs, created_by: userId, updated_by: userId },
      { transaction }
    );

    // Employee Emergency Contacts
    const employeeEmergencies = await Promise.all(
      emergencyData.map((contact) =>
        EmployeeEmergency.create({ ...contact, emp_id, created_by: userId, updated_by: userId }, { transaction })
      )
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


export const updateEmployeeFullInfo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { emp_id } = req.params; // employee id from URL
    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const detailsData = req.body.details ? JSON.parse(req.body.details) : {};
    const userId = req.user.id; // from token

    // 🟢 1️⃣ Handle EmployeeDetails
    const existingDetails = await EmployeeDetails.findOne({ where: { emp_id }, transaction });

    if (existingDetails) {
      // Compare only if detailsData has keys
      if (Object.keys(detailsData).length > 0) {
        const hasChanges = Object.keys(detailsData).some(
          (key) => detailsData[key] != existingDetails[key]
        );

        if (hasChanges) {
          await existingDetails.update(
            { ...detailsData, updated_by: userId },
            { transaction }
          );
          console.log("🟢 Employee details updated.");
        } else {
          console.log("⏩ No changes in employee details, keeping old data.");
        }
      } else {
        console.log("⏩ No new details sent, keeping old data.");
      }
    } else {
      // If details didn’t exist, create a new one
      await EmployeeDetails.create(
        { ...detailsData, emp_id, created_by: userId, updated_by: userId },
        { transaction }
      );
      console.log("🟢 Employee details created (no existing record).");
    }

    // 🟢 2️⃣ Handle EmployeeDocuments
    const docFields = [
      "resume", "aadhar", "pan", "degree", "marksheet", "relieving",
      "experience", "offer", "passport", "driving", "addressproof", "bankproof"
    ];

    const uploadedDocs = {};
    docFields.forEach((field) => {
      if (req.files && req.files[field]) {
        uploadedDocs[field] = path.basename(req.files[field][0].path);
      }
    });

    const existingDocs = await EmployeeDocuments.findOne({ where: { emp_id }, transaction });

    if (existingDocs) {
      if (Object.keys(uploadedDocs).length > 0) {
        const hasDocChanges = Object.keys(uploadedDocs).some(
          (key) => uploadedDocs[key] != existingDocs[key]
        );

        if (hasDocChanges) {
          await existingDocs.update(
            { ...uploadedDocs, updated_by: userId },
            { transaction }
          );
          console.log("🟢 Employee documents updated.");
        } else {
          console.log("⏩ No new document changes, keeping old files.");
        }
      } else {
        console.log("⏩ No document uploads provided, keeping old files.");
      }
    } else {
      await EmployeeDocuments.create(
        { emp_id, ...uploadedDocs, created_by: userId, updated_by: userId },
        { transaction }
      );
      console.log("🟢 Employee documents created (no existing record).");
    }

    // // 🟢 3️⃣ EmployeeEmergency Contacts (unchanged logic)
    // if (req.body.emergency) {
    //   const emergencyData = JSON.parse(req.body.emergency);

    //   await EmployeeEmergency.destroy({ where: { emp_id }, transaction });

    //   if (emergencyData.length > 0) {
    //     await Promise.all(
    //       emergencyData.map((contact) =>
    //         EmployeeEmergency.create(
    //           { ...contact, emp_id, created_by: userId, updated_by: userId },
    //           { transaction }
    //         )
    //       )
    //     );
    //   }
    // } else {
    //   console.log("⏩ Skipping emergency contact update since none was provided.");
    // }


    // 🟢 3️⃣ EmployeeEmergency Contacts (update without duplication)
if (req.body.emergency) {
  let emergencyData = [];
  try {
    if (req.body.emergency.trim() !== "") {
      emergencyData = JSON.parse(req.body.emergency);
    }
  } catch (err) {
    console.warn("⚠️ Invalid emergency JSON:", err.message);
  }

  const existingContacts = await EmployeeEmergency.findAll({ where: { emp_id }, transaction });

  // Update or create contacts
  const updatedOrCreatedIds = [];

  for (const contact of emergencyData) {
    if (contact.id) {
      // Check if the contact already exists
      const existing = existingContacts.find((c) => c.id === contact.id);
      if (existing) {
        // Update only if there are actual changes
        const hasChanges = Object.keys(contact).some(
          (key) => contact[key] != existing[key]
        );

        if (hasChanges) {
          await existing.update(
            { ...contact, updated_by: userId },
            { transaction }
          );
          console.log(`🟢 Updated emergency contact ${contact.id}`);
        } else {
          console.log(`⏩ No changes for contact ${contact.id}`);
        }

        updatedOrCreatedIds.push(contact.id);
      } else {
        // If ID provided but not found, create new
        const newContact = await EmployeeEmergency.create(
          { ...contact, emp_id, created_by: userId, updated_by: userId },
          { transaction }
        );
        updatedOrCreatedIds.push(newContact.id);
        console.log(`🟢 Created new contact (id mismatch): ${newContact.id}`);
      }
    } else {
      // No ID means new contact
      const newContact = await EmployeeEmergency.create(
        { ...contact, emp_id, created_by: userId, updated_by: userId },
        { transaction }
      );
      updatedOrCreatedIds.push(newContact.id);
      console.log("🟢 Created new emergency contact");
    }
  }

  // Delete contacts not included in the new request
  const toDelete = existingContacts.filter(
    (c) => !updatedOrCreatedIds.includes(c.id)
  );
  for (const del of toDelete) {
    await del.destroy({ transaction });
    console.log(`🗑️ Deleted old emergency contact: ${del.id}`);
  }

} else {
  console.log("⏩ Skipping emergency contact update since none was provided.");
}

    await transaction.commit();

    return res.status(200).json({
      message: "Employee full info updated successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error updating employee info:", error);
    return res.status(500).json({
      message: "Error updating employee information",
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
  updateEmployeeFullInfo
};
