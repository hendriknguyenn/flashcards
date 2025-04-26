import dbConfig from "../config/db.config.js"
import Sequelize from "sequelize";
import User from "./user_model.js";
import Question from "./question_model.js";
import Deck from "./deck_model.js";
 
/**
 * Connects to flashcard-database and serializes for Node-Postgres communication
 * 
 */

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  port: dbConfig.PORT,
});
 
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = User(sequelize, Sequelize);
db.decks = Deck(sequelize, Sequelize);
db.questions = Question(sequelize, Sequelize);
 
export default db;