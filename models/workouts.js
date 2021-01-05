const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  // create schema here
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
