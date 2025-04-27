import * as user from "../controllers/user_controller.js";
import express from "express";
 
export default (app) => {
  let router = express.Router();
 
  // Create a new User
  router.post("/", user.create);
 
  // Retrieve all User 
  router.get("/", user.findAll);

  // Retrieve a single User based on ID
  router.get("/:username", user.findByUsername)

  app.use('/api/users', router);

};