const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
require("./passport");

const path = require("path");
const Movies = Models.Movie;
const Users = Models.User;

const cors = require("cors");
app.use(cors());

let allowedOrigins = ["http://localhost:1234", "*"];
//CORS
//implementation
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application doesn’t allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

const { check, validationResult } = require("express-validator");

mongoose.connect(
  "mongodb+srv://mayjessican:Morena91@myflixdb.miyru.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//Middleware
app.use(express.static("public/documentation.html"));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.use(morgan("common"));
app.use(bodyParser.json());
let auth = require("./auth")(app);

let favorite = [];
let movies = [];

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// GET requests
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix 09/09/2020!");
});

// Gets documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

// Gets the list of data about ALL movies
app.get(
  "/movies",
  //passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Gets the data about a movie title
app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get the genre about a movie
app.get("/genres/:name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.name })
    .then((movie) => {
      return res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Gets the data about a movie director
app.get("/director/:name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.name })
    .then((movies) => {
      return res.json(
        "Name: " +
          movies.Director.Name +
          "Bio: " +
          movies.Director.Bio +
          "Birthday: " +
          movies.Director.Birthday
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

let users = [];

// Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Add a user
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Update a user's info, by username
app.put("/users/:Username", (req, res) => {
  const updateInfo = {
    Username: req.body.Username,
    Email: req.body.Email,
  };
  // Password and Birthday are optional
  if (req.body.Password) {
    const hashedPassword = Users.hashPassword(req.body.Password);
    updateInfo.Password = hashedPassword;
  }

  if (req.body.Birthday) {
    updateInfo.Birthday = req.body.Birthday;
  }

  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: updateInfo,
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Add a movie to a user's list of favorites
app.post("/users/:name/movies/:_id", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.name },
    { $push: { FavoriteMovies: req.params._id } },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Deletes a movie from user favorites
app.delete("/users/:name/movies/:movie_id", (req, res) => {
  const userName = req.params.name;
  if (userName) {
    delete favorite[favorite.indexOf(req.params.movie_id)];
    Users.findOneAndUpdate(
      { Username: req.params.name },
      { $pull: { FavoriteMovies: req.params.movie_id } },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
        }
      }
    );

    res.status(200).send("Movie " + req.params.movie_id + " was deleted.");
  } else {
    res.status(404).send("Movie " + req.params.movie_id + " was not found.");
  }
});

// listen for requests
//app.listen(8080, function(){ console.log('Server listening on 8080...')});
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
