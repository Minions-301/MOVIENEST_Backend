'use strict';
const mongoose = require('mongoose');
const review = require ('./reviews.module');
// creat collections in our DB using Schema
const MovieSchema = new mongoose.Schema({
  movie_ID:{type:String ,nique: true},
  title: String,
  overview: String,
  moviePoster: String,
  release_date: String,
  runtime: String,
  vote_average: String,
  num_Of_Watched:Number,
  isWatched: Boolean,
  reviews:[review.ReviewsSchema],
});
// building the model from the schema
const MoviesModel = mongoose.model('movie', MovieSchema);

module.exports = {
  MovieSchema: MovieSchema,
  MoviesModel: MoviesModel
};
