import db from "../models/index.js";

const Op = db.Sequelize.Op;
const Question = db.questions;

// Retrieve all Questions
export const findAll = (req, res) => {
  Question.findAll({
    attributes: ['question', 'answer', 'question_id'],
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Users."
        });
      });
};

export const findAllById = (req, res) => {
    const deck_id = req.params.deck_id;
    Question.findAll({
        where: {deck_id: deck_id,},
        attributes: ['question_id', 'question', 'answer'],
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Questions."
        });
    });
};