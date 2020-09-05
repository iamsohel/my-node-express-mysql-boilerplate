"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      tableName: "users",
    }
  );
  // User.associate = function(models) {

  //   User.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return User;
};
