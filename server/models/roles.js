'use strict';
export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: true
      }
     }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.Users, {
          foreignKey: 'roleId',
          as: 'users',
        });
      }
    }
  });
  return Roles;
};
