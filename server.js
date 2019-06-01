const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { mongoOptions, dbURL } = require('./config');

const app = express();
const port = 8000
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(dbURL, mongoOptions).then(()=>{
  console.log('MongoDB started!');
  app.listen(port, ()=>{
    console.log(`Server started on ${port} port`)
  })
}).catch(()=> console.log('MongoDB failed'));