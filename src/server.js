const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const endpoints = require('./endpoints');
const swaggerDoc = require('./swaggerDoc');
const { mongoOptions, dbURL } = require('./config');


const users = require('./app/users');
const country = require('./app/country');
const roleUsers = require('./app/roleUsers');
const authorization = require('./app/authorization');
const categoryPlace = require('./app/categoryPlace');
const cities = require('./app/cities');


const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(dbURL, mongoOptions).then(()=>{
  console.log('MongoDB started!');
  app.use('/users', users);
  app.use('/country', country);
  app.use('/cities', cities);
  app.use('/role_users', roleUsers);
  app.use('/auth', authorization);
  app.use('/category_place', categoryPlace);

  endpoints(app);
  swaggerDoc(app);
  app.listen(port, ()=>{
    console.log(`Server started on ${port} port`)

  })
}).catch(()=> console.log('MongoDB failed'));