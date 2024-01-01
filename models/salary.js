const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const taxpayers = require("./taxpayers");

class salary extends Model {}

salary.init(
  {
    salary_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    taxpayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yearly_salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    part_time: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    full_time: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "salary",
  }
);

// salary.belongsTo(taxpayers, { foreignKey: "taxpayer_id" });

module.exports = salary;
