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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    medicare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grossAnnual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: "user_id"
      }
    },
    pay_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pay',
        key: "pay_id",
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "taxpayers",

  }
);


module.exports = taxpayers;
