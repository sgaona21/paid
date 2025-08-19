'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.changeColumn(
        'Expenses',
        'amount',
        {
          type: Sequelize.DECIMAL(10, 2),
        },
        { transaction: t }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.changeColumn(
        'Expenses',
        'amount',
        {
          type: Sequelize.INTEGER,
        },
        { transaction: t }
      );
    });
  }
};
