"use strict";

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('rfid', {
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'email'
      }
    },
    rfid: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'rfid',
    timestamps: false
  });
};