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
  ); 
  
  const users = await Users.create(
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
    },
    {
      roles: roleUsers[2],
      username: "coolguy",
      password: "saaadboy",
      email: "cool@gmail.com",
      token: nanoid()
    }
  );

  const country = await Country.create(
    {
      name: "Kyrgyzstan"
    }
  );

  const cities = await Cities.create(
    {
      countryId: country.id,
      name: "Bishkek"
    },
    {
      countryId: country.id,
      name: "Osh"
    },
    {
      countryId: country.id,
      name: "Naryn"
    },
    {
      countryId: country.id,
      name: "Karakol"
    },
    {
      countryId: country.id,
      name: "Talas"
    },
    {
      countryId: country.id,
      name: "Batken"
    },
    {
      countryId: country.id,
      name: "Jalal-Abad"
    }
  );
  
  const categoryPlace = await CategoryPlace.create(
    {
      user: users[0].id,
      name: "hotel"
    },
    {
      user: users[0].id,
      name: "guest house"
    },
    {
      user: users[0].id,
      name: "night club"
    },
    {
      user: users[0].id,
      name: "cafe"
    },
    {
      user: users[0].id,
      name: "restaurant"
    },
    {
      user: users[0].id,
      name: "hostel"
    }
  );

  const place = await Place.create(
    {
      category: categoryPlace[0].id,
      user: users[0].id,
      name: "Lolska Hotel",
      address: "Bokonbaev st. 180",
      email: "loslska@gmail.com",
      isActive: true
    }
  )

  return connection.close()
};

run().catch(error => {
  console.log('Something wrong happened ...', error);
});
