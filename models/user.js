"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      age: DataTypes.INTEGER,
      email: DataTypes.STRING
    }
    // {timestamps: false}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;false
};
