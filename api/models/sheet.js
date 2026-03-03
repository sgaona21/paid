'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.hasMany(models.Expense, { foreignKey: "sheetId", as: "expenses" });
    }
  }
  Sheet.init({
    label: DataTypes.STRING,
    netIncome: DataTypes.DECIMAL(10, 2),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sheet',
  });
  return Sheet;
};