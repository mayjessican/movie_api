const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//hashed password
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

let genreSchema = mongoose.Schema({
 Name: { type: String, required: true },
 Description: { type: String, required: true },
});

let directorSchema = mongoose.Schema({
 Name: { type: String, required: true },
 Bio: { type: String },
 Birth: { type: String },
 Death: { type: String },
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
// let Genre = mongoose.model("Genre", genreSchema);
// let Director = mongoose.model("Director", directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;

mongoimport --host atlas-68m35q-shard-0/myflixdb-shard-00-00.miyru.mongodb.net:27017,myflixdb-shard-00-01.miyru.mongodb.net:27017,myflixdb-shard-00-02.miyru.mongodb.net:27017 --ssl --username mayjessican --password Morena91 --authenticationDatabase admin --db test --collection users --type json --file /mnt/c/Users/mayje/OneDrive/Desktop/Task27/users.json
