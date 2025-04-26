import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      user_id: {
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    });
    return User;
  };