const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const endpoints = require('./endpoints');
const swaggerDoc = require('./swaggerDoc');
const { mongoOptions, dbURL } = require('./config');


const users = require('./app/users');
const roleUsers = require('./app/roleUsers');
const authorization = require('./app/authorization');
const CategoryPlace = require('./app/categoryPlace');


const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(dbURL, mongoOptions).then(()=>{
  console.log('MongoDB started!');
  app.use('/users', users);
  app.use('/role_users', roleUsers);
  app.use('/auth', authorization);
  app.use('/category_place', CategoryPlace);

  endpoints(app);
  swaggerDoc(app);
  app.listen(port, ()=>{
    console.log(`Server started on ${port} port`)

  })
}).catch(()=> console.log('MongoDB failed'));