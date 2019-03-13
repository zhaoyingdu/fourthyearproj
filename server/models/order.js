/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    issuedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expiredate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'email'
      }
    },
    confirmationnumber: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    used:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    tableName: 'order',
    timestamps:false
  });
};
