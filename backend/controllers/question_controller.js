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

export const addQuestion = (req, res) => {
  if (!req.body.deck_id || !req.body.question || !req.body.answer) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const question_data = {
    deck_id: req.body.deck_id,
    question: req.body.question,
    answer: req.body.answer,
  };
  Question.create(question_data)
  .then(data =>{
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating Questions."
    })
  })
}

// needed to delete deck, must delete all records with the foreign key first
export const deleteDeckQuestions = (req, res) => {
  const deck_id = req.params.deck_id;
  Question.destroy({
    where: {deck_id: deck_id},
  })
  .then((num) => {
    if (num === 1) {
      res.send({
        message: "Deck questions were deleted succesfully."
      })
    } else {
      res.send({
        message: `Cannot delete questions from Deck with id=${deck_id}. Possibly deck does not exist.`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting Questions"
    })
  })
}

export const deleteQuestion = (req, res) => {
  const question_id = req.params.question_id;
  Question.destroy({
    where: {question_id: question_id},
  })
  .then((num) => {
    if (num === 1) {
      res.send({
        message: "Question was deleted succesfully."
      })
    } else {
      res.send({
        message: `Cannot delete Question with id=${question_id}. Possibly question does not exist.`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting Question"
    })
  })
} 

export const updateQuestion = (req, res) => {
  const id = req.params.question_id;
  console.log(req.body);
  Question.update(req.body, {
    where: {question_id: id},
  })
  .then((num) => {
    if (num ===1) {
      res.send({
        message: "Question was updated succesfully"
      })
    } else {
      res.send({
          message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
        message: "Error updating Question with id=" + id,
    });
  });
}
