import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
    const Deck = sequelize.define("deck", {
      deck_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      owner_id: {
        type: DataTypes.INTEGER
      },
      deck_name: {
        type: DataTypes.STRING
      }
    }, { 
      timestamps: false, 
    });
    return Deck;
  };