// required modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// create express instance
const app = express();

// setup port
const PORT = process.env.PORT || 8080;

// set middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// setup view routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

// API routes

// app.get("/api/workouts", (req, res) => {
//   db.Workout.find().then((workout) => {
//     res.json(workout);
//   });
// });

// aggregate function to add totalDuration field
app.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ]).then((workout) => {
    //console.log(workout.totalDuration);
    res.json(workout);
  });
});

// create a new workout route
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body).then((workout) => {
    res.json(workout);
    //console.log(workout);
  });
});

// route to add exercise to current workout
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((workout) => {
      res.json(workout);
      //console.log(workout);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .limit(7)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
