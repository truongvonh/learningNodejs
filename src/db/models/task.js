'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Tasks.associate = function(models) {
    // associations can be defined here
  };
  return Tasks;
};