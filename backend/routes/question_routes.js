import * as question from "../controllers/question_controller.js";
import express from "express";
 
export default (app) => {
  let router = express.Router();
 
  //Retrieve all Questions
  router.get("/", question.findAll);

  // Retrieve all questions based on deck ID
  router.get("/:deck_id", question.findAllById)

  router.post("/", question.addQuestion)

  router.delete("/:question_id", question.deleteQuestion)

  router.delete("/deck/:deck_id", question.deleteDeckQuestions)

  router.put("/:question_id", question.updateQuestion)

  app.use('/api/questions', router);

};