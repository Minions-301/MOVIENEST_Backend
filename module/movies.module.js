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
  num_Of_Watched:Number,
  isWatched: Boolean,
  reviews:[review.ReviewsSchema],
});

const MoviesModel = mongoose.model('movie', MovieSchema);

module.exports = {
  MovieSchema: MovieSchema,
  MoviesModel: MoviesModel
};
