"use strict";

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "Expense",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sheetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Expenses",
      timestamps: true,
    }
  );

  Expense.associate = function (models) {
    Expense.belongsTo(models.Sheet, {
      foreignKey: "sheetId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Expense;
};