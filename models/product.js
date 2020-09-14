"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
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
      tableName: "products",
    }
  );
  // Product.associate = function(models) {

  //   Product.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return Product;
};
