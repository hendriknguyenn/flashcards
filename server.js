import express from "express";
import cors from "cors";
import db from "./backend/models/index.js";
import userRoutes from "./backend/routes/user_routes.js";
import deckRoutes from "./backend/routes/deck_routes.js";
import questionRoutes from "./backend/routes/question_routes.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "My flashcard app"});
});

deckRoutes(app);
userRoutes(app);
questionRoutes(app);

// Sync the database
db.sequelize.sync().then(() => {
  console.log("Synced db.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`)
})