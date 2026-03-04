"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Expenses", "sheetId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: "Sheets", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.removeColumn("Expenses", "userId");

    await queryInterface.changeColumn("Expenses", "sheetId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Sheets", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Expenses", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.removeColumn("Expenses", "sheetId");
  },
};
