'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Expense.init({
    name: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10, 2),
    isPaid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};