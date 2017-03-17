'use strict';
export default (sequelize, DataTypes) => {
  const Shared = sequelize.define('Shared', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    canEdit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Shared.belongsTo(models.Documents, {
          foreignKey: 'documentId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Shared;
};
