import db from "../models/index.js";
 
const Op = db.Sequelize.Op;
const Deck = db.decks;
 
// Create and Save a new Deck
export const create = (req, res) => {
  // Validate request
  if (!req.body.owner_id || !req.body.deck_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 
  // Create a Deck
  const deck = {
    owner_id: req.body.owner_id,
    deck_name: req.body.deck_name
  };
 
  // Save Deck in the database
  Deck.create(deck)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Deck."
        });
      });
};

// Retrieve all Deck
export const findAll = (req, res) => {
  Deck.findAll({
    //TODO: change owner_id to current logged on user_id
    where: {owner_id: 1,},
    attributes: ['deck_id', 'deck_name'],
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Deck."
        });
      });
};

export const test = (req, res) => {
  res.status(400).send({
    message:
        'this is a test message'
  })
};
 
