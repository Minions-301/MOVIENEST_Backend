'use strict'

const express = require('express')
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
const user = require('./controller/users');
const movies = require('./controller/movies');
const reviews = require('./controller/reviews');
app.use(express.json());
const MDB_Concetion_String = async ()=>{
  try{
    mongoose.connect(process.env.MN_DB,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useCreateIndex', true);
  }catch(err){
    console.log(err)
  }
}
MDB_Concetion_String();


app.get('/', function (req, res) {
    res.send('Hello MoveNest')
  });

app.delete('/watchList/:id', user.deleteMovieFromWatchList);
app.put('/watchList/', user.moveFromWatchListToWatched);
app.post('/moviesWatched', user.addMovieAsWatched);
app.post('/movies', user.addMovieToWatchList);
app.get('/watchList', user.getWatchList);
app.get('/list', user.getList);
app.get('/watchedList', user.getWatchedList);
app.get('/mostWatched',movies.getMostWatched);
app.get('/reviews', reviews.getReviews);
app.post('/reviews', reviews.addReview);
app.delete('/reviews/:id', reviews.deleteReview);
app.put('/reviews/:id', reviews.updateReview);


app.listen(process.env.PORT)