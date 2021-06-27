'use strict';
const mongoose = require('mongoose');

const movie = require ('./movies.module');


const UserSchema = new mongoose.Schema({
  email: {type: String,unique: true },
  movies: [movie.MovieSchema]
});


const UserModel = mongoose.model('user', UserSchema);

module.exports = {
  UserModel: UserModel
};
