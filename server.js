'use strict'

const express = require('express')
const cors=require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const reviewFunction=require('./review')


app.get('/', function (req, res) {
    res.send('Hello MoveNest')
  });

  
app.post('/review',reviewFunction.addReviews);
app.delete('/review',reviewFunction.deleteReview);
app.put('/review',reviewFunction.updateReview);


app.listen(process.env.PORT)