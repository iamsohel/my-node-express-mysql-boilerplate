"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      tableName: "services",
    }
  );
  // Service.associate = function(models) {

  //   Service.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return Service;
};
