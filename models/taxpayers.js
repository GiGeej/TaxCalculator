const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class taxpayers extends Model {}

taxpayers.init(
  {
    taxpayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ueser_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    income_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["salary", "wage"]], // Only allow 'salary' or 'wage' as valid values
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "taxpayers",
  }
);

taxpayers.belongsTo(taxpayers, { foreignKey: "user_id" });

module.exports = taxpayers;
