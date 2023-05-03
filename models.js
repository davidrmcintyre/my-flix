const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Director: {firstName: String,
    lastName: String,
    Bio: String,
    dateofBirth: Number,
    dateofDeath: Number},
    Genres: {Name: String,
    Description: String},
    Year: Number,
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;