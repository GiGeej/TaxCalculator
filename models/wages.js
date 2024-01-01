const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const taxpayers = require("./taxpayers");

class wages extends Model {}

wages.init(
  {
    wages_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    taxpayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hourly_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days_per_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "wages",
  }
);

// wages.belongsTo(taxpayers, { foreignKey: "taxpayer_id" });

module.exports = wages;
