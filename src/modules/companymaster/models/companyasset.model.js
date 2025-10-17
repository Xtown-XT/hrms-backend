// import { DataTypes } from "sequelize";
// import { v4 as uuidv4 } from "uuid";
// import Sequelize  from "../../../db/index.js";

// const CompanyAsset = hrms.define(
//     "CompanyAsset",
//     {
//         company_asset_id: {
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         asset_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         model_type: {
//             type: DataTypes.STRING,
//             allowNull: true,    
//         },
//         condition : {
//             type: DataTypes.ENUM("new","good","under manitance") ,// e.g., New, Used, Damaged
//             allowNull: false
//         },
//         status:{
//             type: DataTypes.ENUM("active ","inactive"),
//             allowNull: false,
//             defaultValue:"active"
//         },
//         is_active: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true,
//             allowNull: false,
//         },
//         created_by: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         updated_by: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//     },
//     {   
//         tableName: "company_assets",
//         timestamps: true,
//         paranoid: true,
//     }
// );
// export default CompanyAsset;
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../../db/index.js"; // ✅ Correct import

const CompanyAsset = sequelize.define(
  "CompanyAsset",
  {
    company_asset_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize handles UUID automatically
      primaryKey: true,
    },
    asset_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    model_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    condition: {
      type: DataTypes.ENUM("new", "good", "under_maintenance"), // ✅ fixed typo
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), // ✅ removed space
      allowNull: false,
      defaultValue: "active",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "company_assets",
    timestamps: true,
    paranoid: true, // ✅ enables soft delete
  }
);

export default CompanyAsset;


