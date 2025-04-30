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

// Retrieve all Users
export const findAll = (req, res) => {
  User.findAll({
    attributes: ['username', 'password'],
  })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving Users."
        });
      });
};

// Retrieve a single User based on username
export const findByUsername = (req, res) => {
  const username = req.params.username;
  User.findAll({
    attributes: ['user_id','username', 'password'],
    where: {username: username}
  })
  .then((data) => {
    if(data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `User with id=${username} does not exist.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Some error occurred while retrieving User.",
    });
  })
};
 
