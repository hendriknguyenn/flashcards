import * as deck from "../controllers/deck_controller.js";
import express from "express";
 
// router connects the api routes to the controller functions. The controller functions are sending requests to the database

export default (app) => {
  let router = express.Router();
 
  // Create a new Deck
  router.post("/", deck.create);
 
  // Retrieve all Deck
  router.get("/", deck.findAll);

  //test
  router.get("/test", deck.test)

  app.use('/api/decks', router);

};