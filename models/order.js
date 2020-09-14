"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      tableName: "orders",
    }
  );
  // Order.associate = function(models) {

  //   Order.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return Order;
};
