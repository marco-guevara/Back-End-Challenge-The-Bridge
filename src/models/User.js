const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password_hash",
        },
        role: {
          type: DataTypes.ENUM("junior", "senior"),
          allowNull: false,
          defaultValue: "junior"
        }
        
    },
    {
        tableName: "users",
        timestamps: true, // mete los campos de created and updated
        underscored: true,
    }
);

module.exports = User;