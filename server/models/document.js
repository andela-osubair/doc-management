'use strict';
export default (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: DataTypes.STRING,
    docContent: DataTypes.TEXT,
    docType: DataTypes.STRING,
    viewAccess: {
      defaultValue: 'public',
      type: DataTypes.ENUM('public', 'private')
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId'
        });
        Documents.hasMany(models.Shared, {
          foreignKey: 'documentId',
          as: 'documents'
        });
      }
    }
  });
  return Documents;
};
