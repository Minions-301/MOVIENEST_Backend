'use strict'

const express = require('express')
const cors=require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const reviewFunction=require('./review')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

//create a schema
const MovieSchema = new mongoose.Schema({
  id: String,
  nameMovie: String,
  overview : String ,
  rating : Number ,
  img : String,
  avg : Number ,
  isWatched : Boolean

});


//create a schema
const UserSchema = new mongoose.Schema({
  nameUser : String ,
  email: String,
  movies: [MovieSchema]
});



//create a model 
const movieModel = mongoose.model('movies', MovieSchema);

//create a model
const userModel = mongoose.model('users', UserSchema);



function getWatchedMovie (req,res){

  const { email } = req.query;
  userModel.findOne({ email: email }, (error, user) => {
      if (error) {
          res.send(error);
      } 
  
     else{
      const watchList=user.movies.map(item=>{
        if (item.isWatched) {
          return true;
        }
        res.send(watchList);
      }
      )
  
    
      };
  



function getWatchListMovies(req, res) {
  const { email } = req.query;
  userModel.findOne({ email: email }, (error, user) => {
      if (error) {
          res.send(error);
      } 
  
     else{
          const watchList=user.movies.map(item=>{
            if (!item.isWatched) {
              return true;
            }
            res.send(watchList);
          }
          )
  
      };
   
    





app.get('/movies', getWatchListMovies);








app.get('/', function (req, res) {
    res.send('Hello MoveNest')
  });

  
app.post('/review',reviewFunction.addReviews);
app.delete('/review',reviewFunction.deleteReview);
app.put('/review',reviewFunction.updateReview);


app.listen(process.env.PORT)