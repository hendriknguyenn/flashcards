import db from "../models/index.js";
 
const Op = db.Sequelize.Op;
const User = db.users;
 
// Create and Save a new User
export const create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 
  // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password
  };
 
  // Save User in the database
  User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the User."
        });
      });
};
 
