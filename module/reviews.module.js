'use strict';

const mongoose = require('mongoose');


const ReviewsSchema = new mongoose.Schema({
  name: String,
  email: String,
  review_text: String,
  date: String,
  img:String,
});


const ReviewsModel = mongoose.model('review', ReviewsSchema);

module.exports = {
  ReviewsSchema: ReviewsSchema,
  ReviewsModel:ReviewsModel
};
