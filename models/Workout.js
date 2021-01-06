const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    // create schema here
    day: { type: Date, default: Date.now() },

    // might need to change to exercises
    exercises: [
      {
        type: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
);

// create virtual for totalDuration
// WorkoutSchema.virtual("totalDuration").get(function () {
//   //let totalDuration = 0;
//   return this.exercises.reduce(function (total, exercises) {
//     return parseInt(exercises.duration);
//   });
// });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
