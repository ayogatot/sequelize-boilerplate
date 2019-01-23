"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      age: DataTypes.INTEGER,
      email: {type: DataTypes.STRING , allowNull: false},
      password: {type: DataTypes.STRING, allowNull: false},
      role: {type: DataTypes.STRING, allowNull: false}
    }
    // {timestamps: false}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;false
};
