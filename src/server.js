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
const Place = require('./app/place');
const Articles = require('./app/articles');
const Events = require('./app/events');
const EventTypes = require('./app/eventTypes');
const Discovery = require('./app/discovery');






const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
// TODO change static path
app.use(express.static('src/public'));

const api = '/api/v1/';

mongoose.connect(dbURL, mongoOptions).then(()=>{
  console.log('MongoDB started!');
  app.use(`${api}users`, users);
  app.use(`${api}country`, country);
  app.use(`${api}cities`, cities);
  app.use(`${api}role_users`, roleUsers);
  app.use(`${api}auth`, authorization);
  app.use(`${api}category_place`, categoryPlace);
  app.use(`${api}place`, Place);
  app.use(`${api}articles`, Articles);
  app.use(`${api}events`, Events);
  app.use(`${api}eventTypes`, EventTypes);
  app.use(`${api}discovery`, Discovery);

  




  endpoints(app);
  swaggerDoc(app);
  app.listen(port, ()=>{
    console.log(`Server started on ${port} port`)

  })
}).catch(()=> console.log('MongoDB failed'));