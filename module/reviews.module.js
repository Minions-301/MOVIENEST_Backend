'use strict';

const mongoose = require('mongoose');

// creat collections in our DB using Schema
const ReviewsSchema = new mongoose.Schema({
  user_name: String,
  review_text: String,
  date: Date,
});

// building the model from the schema
//const ReviewsModel = mongoose.model('review', ReviewsSchema);

module.exports = {
  ReviewsSchema: ReviewsSchema,
};
