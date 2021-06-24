'use strict'
const express = require('express')
const cors=require('cors');
require('dotenv').config();
const app = express();
app.use(cors());


app.get('/', function (req, res) {
    res.send('Hello MoveNest')
  });

  app.listen(process.env.PORT)