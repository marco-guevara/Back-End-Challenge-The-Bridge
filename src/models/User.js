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
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    rol: {
      type: DataTypes.ENUM("Admin", "Analyst"),
      allowNull: false,
      defaultValue: "Analyst",
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  },
);

module.exports = User;
