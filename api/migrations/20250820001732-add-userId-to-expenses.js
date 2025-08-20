
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        'Expenses',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,                  // set true if you already have rows; tighten later
          references: { model: 'Users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        { transaction: t }
      );

      await queryInterface.addIndex('Expenses', ['userId'], { transaction: t });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeIndex('Expenses', ['userId'], { transaction: t });
      await queryInterface.removeColumn('Expenses', 'userId', { transaction: t });
    });
  }
};
