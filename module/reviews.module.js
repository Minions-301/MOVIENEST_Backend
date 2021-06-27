'use strict';

const mongoose = require('mongoose');


const ReviewsSchema = new mongoose.Schema({
  user_name: String,
  review_text: String,
  date: Date,
});


//const ReviewsModel = mongoose.model('review', ReviewsSchema);

module.exports = {
  ReviewsSchema: ReviewsSchema,
};
