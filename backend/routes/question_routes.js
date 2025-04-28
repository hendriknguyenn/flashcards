import * as question from "../controllers/question_controller.js";
import express from "express";
 
export default (app) => {
  let router = express.Router();
 
  //Retrieve all Questions
  router.get("/", question.findAll);

  // Retrieve all questions based on deck ID
  router.get("/:deck_id", question.findAllById)

  app.use('/api/questions', router);

};