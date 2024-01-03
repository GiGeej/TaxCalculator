const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pay extends Model{}

Pay.init(
    {
        pay_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        is_casual: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        gross_annual: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        has_hecs: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // taxpayer_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'taxpayer',
        //         key: "taxpayer_id",
        //     }
        // }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: "pay"
    }
)

module.exports = Pay;