"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
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
      tableName: "reviews",
    }
  );
  // Review.associate = function(models) {

  //   Review.belongsTo(models.Company, {
  //     foreignKey: 'companyId'
  //   });

  // };
  return Review;
};
