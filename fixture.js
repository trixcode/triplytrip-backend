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
    },
    {
      user: users[0].id,
      name: "chaihana"
    }
  );

  const place = await Place.create(
    {
      category: categoryPlace[1].id,
      user: users[0].id,
      name: "Guest House Kol-Ukok",
      address: "Isakeev, Shkolnaya st., 26, 722800 Кочкор, Киргизия",
      email: "empty@gmail.com",
      isActive: true,
      description: `Гостевой дом «Коль-Укок» с садом и общим лаунджем находится в Кочкоре. К услугам гостей круглосуточная стойка регистрации, трансфер от/до аэропорта, общая кухня и бесплатный Wi-Fi.

                    Все номера гостевого дома оснащены чайником. В распоряжении гостей каждого номера гостевого дома Kol-Ukok общая ванная комната с феном и бесплатными туалетно-косметическими принадлежностями.
                    
                    Ежедневно в гостевом доме подают азиатский и халяльный завтрак.
                    
                    Рядом с гостевым домом Kol-Ukok можно заняться различными видами активного отдыха.
                    
                    В этом гостевом доме лучшее соотношение цены и качества в городе Кочкор! По сравнению с другими вариантами в этом городе, гости получают больше за те же деньги.
                    
                    Мы говорим на вашем языке!`,
      phone: "0505 005 569",
      price: 1500
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
      email: "baran@barashek.kg"  ,
      isActive: true,
      mainImage: "http://smak.kg/wp-content/gallery/barashek/IMG-20181003-WA0011.jpg",
      phone: "+996-312-52-11-11",
      price: 22,
      rating: 4,
      description: "https://restoran.kg/restaurant/10-barashek",
      extraDescription: "",
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Faiza",
      address: "Тыныстанова 157, Жибек-Жолу 555, Медерова 159",
      email: "faiza.@mail.kg",
      isActive: true,
      mainImage: "https://2gis.kg/bishkek/firm/70000001019339201/gallery/firm/70000001019339201/photos/firm/70000001019339201-15762598728717388",       
      phone: "+996-0555-32-49-22",
      price: 100,
      rating: 4,
      description: `Кафе «Фаиза» открылось в далеком 1998 году, и с тех пор, благодаря нашим стараниям и поддержке гостей, мы открыли второе заведение, а название стало отечественным брендом. 
                    Как мы привлекаем своих посетителей? Мы относимся с любовью ко всему – к гостям, к традициям и к атмосфере. У нас всегда оказывают теплый прием посетителям. 
                    Основной акцент мы сделали на восточную кухню, так как она является самой востребованной в нашей стране и во всей Средней Азии. 
                    Ежедневно нас посещают люди самых разных возрастов и профессий – школьники и студенты, семейные пары, пожилые люди, крупные бизнесмены, государственные служащи 
                    В «Фаиза» часто бывают иностранные гости, которые после посещения остаются приятно удивлены. Вот некоторые из отзывов, которые оставили туристы на популярном портале для путешественников Trip  Advisor :
                    ««Фаиза» — кафе с великолепными блюдами восточной кухни по очень хорошим ценам. Здесь всегда много людей. Отличное место, чтобы насладиться среднеазиатской кухней. Стоит посетить обязательно!»
                    «В кафе «Фаиза» мы попробовали лучшую еду в Кыргызстане. Сервис расторопный и дружелюбный. Цены радуют. Это хорошее место для быстрого обеда. Радует, что здесь не пьют и не курят.»
                    «Если вы хотите попробовать традиционную среднеазиатскую еду, это место для вас. Здесь более чем разумные цены. Меню очень богато.»
                    «Мы пообедали здесь, и мы действительно наслаждались едой: лагман, манты, самсы и салаты. Здесь чисто и достаточно комфортно, цены очень доступные и обслуживание очень хорошее. Отличное место, чтобы почувствовать вкус местной кухни.»
                    «Я посещал это место во время обеденных перерывов. Пища здесь очень вкусная. Мне нравится. Рекомендую это место всем!»
                    Разумеется, такие отзывы не могут не радовать. И это помогает нам всегда поддерживать высокий уровень качества приготовления блюд и сервиса.
                    Наши повара – профессионалы своего дела, которые прекрасно разбираются в восточной и европейской кухне. Для обслуживания гостей используется самая современная система приема заказов, что позволяет значительно сократить время ожидания.
                    Приветливое и быстрое обслуживание, а также многообразие блюд на любой вкус обеспечат Вам комфортный отдых, а демократичные цены Вас приятно удивят. Все блюда, представленные в нашем меню, готовятся только из свежих и качественных продуктов, 
                    так как наши принципы не позволяют нам использовать полуфабрикаты и вкусовые добавки. Мясо, из которого готовятся наши блюда производится в Кыргызстане. 
                    Вы всегда можете рассчитывать на помощь опытного и внимательного персонала: Вам с удовольствием расскажут о любом блюде и особенностях его приготовления
                    Основная концепция заведения – это восточная и европейская кухня в сочетании с уютной, теплой обстановкой и хорошим обслуживанием. Радушие и доброжелательность к гостям, 
                    уважение к традициям и следование классической рецептуре – вот что стало визитной карточкой кафе «Фаиза».
                    Интерьер «Фаиза» оформлен в восточном стиле. Теплые оттенки настраивают на дружелюбный тон. Залы украшены элементами быта среднеазиатских народов. Декоративные потолки с узорами ручной работы.`,
      
      extraDescription: `На протяжении многих лет мы создаем для наших клиентов атмосферу уюта и отдыха. Каждый день нас посещает огромное количество людей всех возрастов, 
                            начиная от студентов и заканчивая деловыми людьми. Всех их объединяет одно -  любовь к восточной кухне. 
                            "Фаиза" - сеть кафе, заслужившая известность далеко за пределами страны, благодаря превосходной кухне, первоклассному обслуживанию и вниманию к каждому гостю.`,
    },                     
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Boris coffee and bakery by Vanilla",
      address: "Эркиндик бульвар, 14",
      email: "borboris@mail.com",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t31.0-8/18921103_230738500751178_2719542476778930357_o.jpg?_nc_cat=102&_nc_ht=scontent.ffru7-1.fna&oh=432876df46f3046ccee8b6a8ba72ec22&oe=5DBF692A",
      phone: "+996-555‒34‒11‒66",
      price: 200,
      rating: 3,
      description: `Название кофейня получила в честь Ким Бориса, основателя сети магазинов «Наша марка» (1990).
                    Здесь вы можете насладиться всегда свежей выпечкой, отменным кофе, а также… увидеть своими 
                    глазами весь процесс приготовления и оформления тортов в специальной кондитерской студии!`,
      extraDescription: `Кофейня Boris - проект Vanilla Sky, где предлагается всегда свежий кофе и самая вкусная выпечка в городе!`,
    },
    {
      category: categoryPlace[6].id,
      user: users[0].id,
      name: "NAVAT",
      address: "Киевская 114/1, фучика 3, токонбаева 32/4, турусбекова 100, курманжан датка 242, Байтик баатыра 55, ибраимова 42, ТРЦ бишкек парк 3-этаж    ",
      email: "info@navat.kg",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t1.0-9/53750261_1498933170238508_7608176837037916160_n.jpg?_nc_cat=105&_nc_ht=scontent.ffru7-1.fna&oh=0b7e873c0ba9d616aa016c3cd36dd305&oe=5D83783F",
      phone: "+996-551-63-11-11",
      price: 200,
      rating: 5,
      description: `Сокровищница лучших блюд национальной кухни в непревзойденном исполнении наших мастеров в Чайхана NAVAT! 
                    Пышущий жаром рассыпчатый золотистый плов: рисинка к рисинке, солнечная сладкая морковь и нежное мясо!`,
      extraDescription: `Чайхана NAVAT создает настоящее отечественное, качественное кафе, способное стать альтернативой иностранным брендам. Чайхана NAVAT – для всех`
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "SIERRA",
      address: "Аалы Токомбаева 7/6, Московская 69, Исанова 100, ТД ташрабат 2-этаж",
      email: " sales@sierra.kg",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t1.0-9/1460981_616583271736740_291291161_n.jpg?_nc_cat=104&_nc_ht=scontent.ffru7-1.fna&oh=dba92442af13f44da4625bffc7ba5170&oe=5D87B872",
      phone: "+996-312-90-38-49",
      price: 150,
      rating: 5,
      description: `Чтобы получить прекрасную чашку кофе, Sierra импортирует только высококачественный зеленый кофе из Бразилии, 
                    Колумбии, Гватемалы и Эфиопии, и обжаривает зерна в Бишкеке, чтобы гарантировать вам высокое качество и свежесть аромата.
                    Мы очень тщательно отбираем ингредиенты для напитков и блюд из нашего меню, разрабатываем специальные рецепты, 
                    и взаимодействуем со своими сотрудниками и клиентами, чтобы максимально удовлетворять вкусы своих посетителей. 
                    Мы хотим, чтобы наша кухня всегда была на высоте: день за днем, постоянно. Если у вас возникнут проблемы с кухней, 
                    или обслуживанием – сообщите нам об этом, и мы сделаем все возможное, чтобы решить проблему на месте.`,
      extraDescription: `Sierra – это впечатления. Кофе, коктейли, пирожные, панини, супы, салаты, музыка и обслуживание – это частички вашего впечатления. 
                         Если вы выпили чашечку кофе, провели время с друзьями, или поработали за компьютером в нашем кафе, и остались довольны – мы просто счастливы!`,
    },
  );

  return connection.close()
};

run().catch(error => {
  console.log('Something wrong happened ...', error);
});
