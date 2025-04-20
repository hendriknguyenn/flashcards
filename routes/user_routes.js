import * as user from "../controllers/user_controller.js";
import express from "express";
 
export default (app) => {
  let router = express.Router();
 
  // Create a new User
  router.post("/", user.create);
 
  // Retrieve all User 
  router.get("/", user.findAll);
 
  // Retrieve a single User with id
  router.get("/:id", user.findOne);
 
  // Update a User with id
  router.put("/:id", user.update);
 
  // Delete a User with id
  router.delete("/:id", user.deleteOne);
 
  // Delete all User 
  router.delete("/", user.deleteAll);
 
  // Find all published User 
  router.get("/published", user.findAllPublished);
 
  app.use('/api/tutorials', router);
};