'use strict';
const mongoose = require('mongoose');
const review = require ('./reviews.module');

const MovieSchema = new mongoose.Schema({
  movie_ID:{type:String ,nique: true},
  title: String,
  overview: String,
  moviePoster: String,
  release_date: String,
  vote_average: String,
  moviePoster:String,
  num_Of_Watched:String,
  isWatched: Boolean,
  reviews:[review.ReviewsSchema],
});

const MoviesModel = mongoose.model('movie', MovieSchema);

module.exports = {
  MovieSchema: MovieSchema,
  MoviesModel: MoviesModel
};
