const nanoid = require('nanoid');
const mongoose = require('mongoose');

const RoleUsers = require('./src/models/RoleUsers');
const Users = require('./src/models/Users');
const Country = require('./src/models/Country');
const Cities = require('./src/models/Cities');
const CategoryPlace = require('./src/models/CategoryPlace');
const Place = require('./src/models/Place');

const { dbURL, mongoOptions } = require('./src/config');


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
    },
    {
      category: categoryPlace[0].id,
      user: users[0].id,
      name: "Plaza Hotel Bishkek ",
      address: "Улица Тоголок Молдо 52, Бишкек",
      email: "reception@plazahotel.kg",
      isActive: true,
      mainImage: "https://t-ec.bstatic.com/images/hotel/max1024x768/430/43006880.jpg",  
      phone: "+996-312-53-77-77",
      price: 280,
      rating: 4,
      description: "https://www.booking.com/hotel/kg/plaza-bishkek.ru.html?aid=319915;label=bishkek-p2eDJaFg3uJgkkTiXSPSeAS153052993080%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap1t1%3Aneg%3Afi%3Atiaud-294080458546%3Akwd-37700281435%3Alp1009827%3Ali%3Adec%3Adm;sid=59ee6559d944f65738c7a5dae4d563c5#map_closed",
      extraDescription: "",
    },
    {
      category: categoryPlace[0].id,
      user: users[0].id,
      name: "Garden Hotel",
      address: "Улица Медерова 115, Бишкек",
      email: "hotelgardenkg@gmail.com",
      isActive: true,
      mainImage: "https://t-ec.bstatic.com/images/hotel/max1024x768/112/112045315.jpg",  
      phone: "+996-312-54-54-25",
      price: 56,
      rating: 4,
      description: "https://www.booking.com/hotel/kg/garden.ru.html?aid=319915;label=bishkek-p2eDJaFg3uJgkkTiXSPSeAS153052993080%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap1t1%3Aneg%3Afi%3Atiaud-294080458546%3Akwd-37700281435%3Alp1009827%3Ali%3Adec%3Adm;sid=59ee6559d944f65738c7a5dae4d563c5",
      extraDescription: "",
    },
    {
      category: categoryPlace[0].id,
      user: users[0].id,
      name: "Discovery Hotel",
      address: "Оренбургский переулок , 31 , Бишкек",
      email: "reception@discoveryhotel.kg",
      isActive: true,
      mainImage: "https://t-ec.bstatic.com/images/hotel/max1024x768/741/74166393.jpg",       
      phone: "+996-312-56-33-33",
      price: 165,
      rating: 4,
      description: "https://www.booking.com/hotel/kg/discovery.ru.html?aid=319915;label=bishkek-p2eDJaFg3uJgkkTiXSPSeAS153052993080%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap1t1%3Aneg%3Afi%3Atiaud-294080458546%3Akwd-37700281435%3Alp1009827%3Ali%3Adec%3Adm;sid=59ee6559d944f65738c7a5dae4d563c5;checkin=2019-06-20;checkout=2019-06-23;room1=A,A;homd=1;srpvid=5b087d9841be026c;srepoch=1560966731;atlas_src=hp_iw_title",
      extraDescription: "",
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Obama Bar & Grill",
      address: "ул. Токтогула, 93, уг. ул. Тыныстанова",
      email: "info@obama.kg"  ,
      isActive: true,
      mainImage: "https://strg1.restoran.kg/neofiles/serve-image/57c6ad78b7f1d90f5600094f/1170x468/c1/q70",
      phone: "+996-312-66-47-53",
      price: 15,
      rating: 4,
      description: "http://www.obama.kg/",
      extraDescription: "",
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Барашек",
      address: "ул. Токомбаева, 78, уг. ул. Куттубаева",
      email: "https://www.instagram.com/barashek.kg/"  ,
      isActive: true,
      mainImage: "http://smak.kg/wp-content/gallery/barashek/IMG-20181003-WA0011.jpg",
      phone: "+996-312-52-11-11",
      price: 22,
      rating: 4,
      description: "https://restoran.kg/restaurant/10-barashek",
      extraDescription: "",
    },
  );

  return connection.close()
};

run().catch(error => {
  console.log('Something wrong happened ...', error);
});
