// required modules
const express = require("express");
const mongoose = require("mongoose");

// create express instance
const app = express();

// setup port
const PORT = process.env.PORT || 8080;

// set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// setup view routes

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
