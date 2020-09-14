"use strict";
module.exports = (sequelize, DataTypes) => {
  const SubService = sequelize.define(
    "SubService",
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
      tableName: "sub_services",
    }
  );
  // Order.associate = function(models) {

  //   Order.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return SubService;
};
