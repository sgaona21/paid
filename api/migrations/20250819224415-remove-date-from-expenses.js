'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('Expenses', 'date', { transaction: t });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        'Expenses',
        'date',
        { type: Sequelize.DATE, allowNull: true },
        { transaction: t }
      );
    });

  }
};
