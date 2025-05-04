import * as deck from "../controllers/deck_controller.js";
import express from "express";
 
// router connects the api routes to the controller functions. The controller functions are sending requests to the database

export default (app) => {
  let router = express.Router();
 
  // Create a new Deck
  router.post("/", deck.create);
 
  // Retrieve all Deck
  router.get("/", deck.findAll);

  // Retrieve decks based on user ID
  router.get("/:user_id", deck.findUserDecks);

  // Delete a Deck
  router.delete("/:deck_id", deck.deleteDeck);

  // Get a Deck Name from deck ID
  router.get("/name/:deck_id", deck.findDeckName);

  app.use('/api/decks', router);

};