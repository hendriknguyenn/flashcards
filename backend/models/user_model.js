import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: false,
    });
    return User;
  };