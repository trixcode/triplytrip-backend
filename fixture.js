const nanoid = require('nanoid');
const mongoose = require('mongoose');

const RoleUsers = require('./src/models/RoleUsers');
const Users = require('./src/models/Users');
const Country = require('./src/models/Country');
const Cities = require('./src/models/Cities');
const CategoryPlace = require('./src/models/CategoryPlace');
const Place = require('./src/models/Place');

const {dbURL, mongoOptions} = require('./src/config');


const run = async () => {
  await mongoose.connect(dbURL, mongoOptions);
  const connection = mongoose.connection;
  const collections = await connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }
  const roleUsers = await RoleUsers.create(
    {
      name: 'admin'
    },
    {
      name: 'moderator'
    },
    {
      name: 'user'
    }
  ); await Users.create(
    {
      roles: roleUsers[0],
      username: 'admin',
      password: 'lol',
      email: 'sobolev@gmail.com',
      token: nanoid()
    },
    {
      roles: roleUsers[2],
      username: 'user',
      password: '1',
      email: 'user@gmail.com',
      token: nanoid()
    },
    {
      roles: roleUsers[1],
      username: 'moder',
      password: '1',
      email: 'moder@gmail.com',
      token: nanoid()
    }
  );
  return connection.close()
};

run().catch(error => {
  console.log('Something wrong happened ...', error);
});
