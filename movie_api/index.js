const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();

//Middleware
app.use(express.static('public/documentation.html'));
app.use(morgan("common"));
app.use(bodyParser.json());

let favourite = [];

let movies = [
  {id: 9,
  title: "Pans Labyrinth",
  description: "In 1944 Spain, a lonely girl encounters a faun in an ancient maze and must complete three dangerous tasks to achieve immortality.",
  genre: "Science Fiction",
  director: "Guillermo del Toro"},

  {id: 8,
  title: "Jaws",
  description: "A giant shark is feeding on the good people of Amity Island and it's up to police chief Martin Brody to hunt down the finned fiend.",
  genre: "Horror",
  director: "Steven Spielberg"},

  {id: 7,
  title: "Shrek",
  description: "A grouchy ogre and his jabbering donkey sidekick set out to rescue an imprisoned princess from a scheming lord",
  genre: "Adventure",
  director: "Andrew Adamson"},

  {id: 6,
  title: "The last of the Mohicans",
  description: "The Last of the Mohicans is a 1992 American epic historical drama film set in 1757 during the French and Indian War.",
  genre: "Action",
  director: "Michael Mann"},

  {id: 5,
  title: "Out of Africa",
  description: "Based on the story of Karen Blixen, who leaves her native Denmark in 1913 to marry a baron and run a coffee plantation in Kenya.",
  genre: "Biography",
  director: "Sydney Pollock"},

  {id: 4,
  title: "Waiting to exhale",
  description: "The story centers on four women living in the Phoenix, Arizona area and their relationships with men and one another. All of them are holding their breath until the day they can feel comfortable in a committed relationship with a man.",
  genre: "Comedy",
  director: "Forest Whitaker"},

  {id: 3,
  title: "Parasite",
  description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan",
  genre: "Comedy",
  director: "Bong Joon-ho"},

  {id: 2,
  title: "Black Panther",
  description: "After his father's tragic death, and the events involving members of the Avengers that followed, T'Challa returned to Wakanda as King",
  genre: "Action",
  director: "Ryan Coogler"},

  {id: 1,
  title: "The Godfather",
  description: "The Godfather Don Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business.",
  genre: "Crime",
  director: "Francis Ford Coppola"}
];

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Gets documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Gets the data about a movie title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movies) =>
    {return movies.title === req.params.title}));
});

// Get the genre about a movie
app.get('/genres/:name', (req, res) => {
  const results = movies.find((movie) =>
    {return movie.genre === req.params.name});
  res.json(results);
});

// Gets the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets the data about a movie director
app.get('/directors/:name', (req, res) => {
  res.json(movies.find((movie) =>
    {return movie.director === req.params.name}));
});

let users = []

//Gets data about users
app.get('/users', (req, res) => {
  res.json(users);
});

// Adds data for a new users
app.post('/users', (req, res) => {
  let newUser = req.body;
  if(!newUser.name){
    const message = 'Missing name in request body';
    res.status(400).send (message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(200).send(newUser);
  }
});

// Updates user information
app.put('/users/:id', (req, res) => {
  let userName = req.params.name;
  users = users.find((user_id) => { return user_id !== req.params.id });
  res.status(200).send('User ' + req.params.id + ' was updated.');
});

// Deletes a user from our list by ID
app.delete('/users/:id', (req, res) => {
  let user_id = req.params.id;
     users = users.filter((user_id) => { return user_id !== req.params.id });
     res.status(200).send('User ' + req.params.id + ' was deleted.');
  // }
});

// Updates user favourites
app.post('/users/:name/movies/:movie_id', (req, res) => {
  let movie_id = req.params.movie_id;
  let userName = req.params.name;
  if (userName) {
  favourite = favourite.push(movie_id);
    res.status(200).send('Movie ' + req.params.movie_id + ' was assigned to favourites.');
  } else {
    res.status(404).send('Movie ' + req.params.movie_id + ' was not found.');
  }
});

//Deletes a movie from user favourites
app.delete('/users/:name/movies/:movie_id', (req, res) => {
  let movie_id = req.params.movie_id;
  let userName = req.params.name;
  if (userName) {
    delete favourite[favourite.indexOf(movie_id)]
    res.status(200).send('Movie ' + req.params.movie_id + ' was deleted.');
  } else {
    res.status(404).send('Movie ' + req.params.movie_id + ' was not found.')
  }
});

// listen for requests
app.listen(8080, function(){ console.log('Server listening on 8080...')});
