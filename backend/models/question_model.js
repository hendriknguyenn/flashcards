import { DataTypes } from "sequelize";
export default (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
      question_id: {
        type: DataTypes.INTEGER
      },
      deck_id: {
        type: DataTypes.INTEGER
      },
      question: {
        type: DataTypes.STRING
      },
      answer: {
        type: DataTypes.STRING
      }
    });
    return Question;
  };