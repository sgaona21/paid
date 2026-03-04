'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Expenses", "sheetId", {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: "Sheets", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Expenses", "sheetId", {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: { model: "Sheets", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  });
  }
};
