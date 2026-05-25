const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "nombre",
    },
    role: {
      type: DataTypes.ENUM("Admin", "Analyst"),
      allowNull: false,
      defaultValue: "Analyst",
      field: "rol",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "activo",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "fecha_creacion",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password_hash",
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

module.exports = User;
