import { DataTypes, STRING } from "sequelize";
export default (sequelize, Sequelize) => {
    const Deck = sequelize.define("deck", {
      deck_id: {
        type: DataTypes.INTEGER
      },
      owner_id: {
        type: DataTypes.INTEGER
      },
      deck_name: {
        type: DataTypes.STRING
      }
    });
    return Deck;
  };