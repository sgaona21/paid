"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sheet = sequelize.define(
    "Sheet",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "New Sheet",
      },
      netIncome: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Sheets",
      timestamps: true,
    }
  );

  Sheet.associate = function (models) {
    Sheet.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Sheet.hasMany(models.Expense, { foreignKey: "sheetId" })
  };

  return Sheet;
};