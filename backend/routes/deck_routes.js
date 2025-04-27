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
  router.get("/:user_id", deck.findUserDecks)

  app.use('/api/decks', router);

};