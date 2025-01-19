const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define(
    'item',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'name cannot be null',
                },
                notEmpty: {
                    msg: 'name cannot be empty',
                },
            },
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[true, false]],
                    msg: 'isFeatured value must be true or false',
                },
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'description cannot be null',
                },
                notEmpty: {
                    msg: 'description cannot be empty',
                },
            },
        },
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          validate: {
              isInt: { msg: 'Quantity must be an integer' },
              min: { args: [0], msg: 'Quantity cannot be negative' },
          },
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'item',
    }
);