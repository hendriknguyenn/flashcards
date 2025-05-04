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

//Retrieve all Decks that belong to a User
export const findUserDecks = (req, res) => {
  const user_id = req.params.user_id;
  Deck.findAll({
    where: {owner_id: user_id,},
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

export const findDeckName = (req, res) => {
  const deck_id = req.params.deck_id;
  console.log("DECK ID:" + deck_id);
  Deck.findByPk(deck_id)
  .then(data => {
    if(data){
      res.send(data);
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Deck name."
    })
  });
};

export const deleteDeck = (req, res) => {
  const deck_id = req.params.deck_id;
  Deck.destroy({
    where: { deck_id: deck_id },
  }).then((num) => {
    if (num === 1) {
      res.send({
        message: "Deck was deleted succesfully."
      })
    } else {
      res.send({
        message: `Cannot delete Deck with id=${deck_id}. Possibly deck does not exist.`
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete Deck"
    })
  });
};
 
