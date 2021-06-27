'use strict'
const express = require('express')
const cors=require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const mongoose = require('mongoose');
const user = require('./controller/users');
const movies = require('./controller/movies');
const reviews = require('./controller/reviews');

app.get('/', function (req, res) {
    res.send('Hello MoveNest')
  });

  const MDB_Concetion_String = async ()=>{
    try{
      mongoose.connect(process.env.MN_DB,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
    }catch(err){
      console.log(err)
    }
  }
  MDB_Concetion_String();


app.delete('/watchList', user.deleteMovieFromWatchList);
app.put('/watchList', user.moveFromWatchListToWatched);
app.post('/movies', user.addMovieToWatchList);
app.get('/watchList', user.getWatchList);
app.get('/watchedList', user.getWatchedList);
app.get('/mostWatched',movies.getMostWatched)

app.get('/reviews', reviews.getReviews);
app.post('/reviews', reviews.addReview);
app.delete('/reviews', reviews.deleteReview);
app.put('/reviews', reviews.updateReview);


app.listen(process.env.PORT)