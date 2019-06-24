const nanoid = require('nanoid');
const mongoose = require('mongoose');

const RoleUsers = require('./src/models/RoleUsers');
const Users = require('./src/models/Users');
const Country = require('./src/models/Country');
const Cities = require('./src/models/Cities');
const CategoryPlace = require('./src/models/CategoryPlace');
const Place = require('./src/models/Place');
const Articles = require('./src/models/Articles');
const Events = require('./src/models/Events');
const EventTypes = require('./src/models/EventTypes');
const Discovery = require('./src/models/Discovery');





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
      rating: 2,
      description: `<p>Гостевой дом «Коль-Укок» с садом и общим лаунджем находится в Кочкоре. К услугам гостей круглосуточная стойка регистрации, трансфер от/до аэропорта, общая кухня и бесплатный Wi-Fi.

      Все номера гостевого дома оснащены чайником. В распоряжении гостей каждого номера гостевого дома Kol-Ukok общая ванная комната с феном и бесплатными туалетно-косметическими принадлежностями.
      
      Ежедневно в гостевом доме подают азиатский и халяльный завтрак.
      
      Рядом с гостевым домом Kol-Ukok можно заняться различными видами активного отдыха.
      
      В этом гостевом доме лучшее соотношение цены и качества в городе Кочкор! По сравнению с другими вариантами в этом городе, гости получают больше за те же деньги.
      
      Мы говорим на вашем языке!</p>`,
      phone: "996505005569",
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
      phone: "996312537777",
      price: 19545,
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
      phone: "996312545425",
      price: 3900,
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
      phone: "996312563333",
      price: 11500,
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
      phone: "996312664753",
      price: 1050,
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
      phone: "996312521111",
      price: 1530,
      rating: 4,
      description: "https://restoran.kg/restaurant/10-barashek",
      extraDescription: "",
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Faiza",
      address: "Тыныстанова 157, Жибек-Жолу 555, Медерова 159",
      email: "faiza.kg",
      isActive: true,
      mainImage: "https://2gis.kg/bishkek/firm/70000001019339201/gallery/firm/70000001019339201/photos/firm/70000001019339201-15762598728717388",       
      phone: "996555324922",
      price: 100,
      rating: 4,
      description: `<p>Кафе «Фаиза» открылось в далеком 1998 году, и с тех пор, благодаря нашим стараниям и поддержке гостей, мы открыли второе заведение, а название стало отечественным брендом. 
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
                    Интерьер «Фаиза» оформлен в восточном стиле. Теплые оттенки настраивают на дружелюбный тон. Залы украшены элементами быта среднеазиатских народов. Декоративные потолки с узорами ручной работы.</p>`,
      
      extraDescription: `<p>На протяжении многих лет мы создаем для наших клиентов атмосферу уюта и отдыха. Каждый день нас посещает огромное количество людей всех возрастов, 
                            начиная от студентов и заканчивая деловыми людьми. Всех их объединяет одно -  любовь к восточной кухне. 
                            "Фаиза" - сеть кафе, заслужившая известность далеко за пределами страны, благодаря превосходной кухне, первоклассному обслуживанию и вниманию к каждому гостю.</p>`,
    },                     
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "Boris coffee and bakery by Vanilla",
      address: "Эркиндик бульвар, 14",
      email: "empty@mail.ru",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t31.0-8/18921103_230738500751178_2719542476778930357_o.jpg?_nc_cat=102&_nc_ht=scontent.ffru7-1.fna&oh=432876df46f3046ccee8b6a8ba72ec22&oe=5DBF692A",
      phone: "996555341166",
      price: 200,
      rating: 3,
      description: `<p>Название кофейня получила в честь Ким Бориса, основателя сети магазинов «Наша марка» (1990).
                    Здесь вы можете насладиться всегда свежей выпечкой, отменным кофе, а также… увидеть своими 
                    глазами весь процесс приготовления и оформления тортов в специальной кондитерской студии!</p>`,
      extraDescription: `<p>Кофейня Boris - проект Vanilla Sky, где предлагается всегда свежий кофе и самая вкусная выпечка в городе!</p>`,
    },
    {
      category: categoryPlace[6].id,
      user: users[0].id,
      name: "NAVAT",
      address: "Киевская 114/1, фучика 3, токонбаева 32/4, турусбекова 100, курманжан датка 242, Байтик баатыра 55, ибраимова 42, ТРЦ бишкек парк 3-этаж    ",
      email: "info@navat.kg",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t1.0-9/53750261_1498933170238508_7608176837037916160_n.jpg?_nc_cat=105&_nc_ht=scontent.ffru7-1.fna&oh=0b7e873c0ba9d616aa016c3cd36dd305&oe=5D83783F",
      phone: "996551631111",
      price: 200,
      rating: 5,
      description: `<p>Сокровищница лучших блюд национальной кухни в непревзойденном исполнении наших мастеров в Чайхана NAVAT! 
                    Пышущий жаром рассыпчатый золотистый плов: рисинка к рисинке, солнечная сладкая морковь и нежное мясо!</p>`,
      extraDescription: `<p>Чайхана NAVAT создает настоящее отечественное, качественное кафе, способное стать альтернативой иностранным брендам. Чайхана NAVAT – для всех</p>`
    },
    {
      category: categoryPlace[4].id,
      user: users[0].id,
      name: "SIERRA",
      address: "Аалы Токомбаева 7/6, Московская 69, Исанова 100, ТД ташрабат 2-этаж",
      email: " sales@sierra.kg",
      isActive: true,
      mainImage: "https://scontent.ffru7-1.fna.fbcdn.net/v/t1.0-9/1460981_616583271736740_291291161_n.jpg?_nc_cat=104&_nc_ht=scontent.ffru7-1.fna&oh=dba92442af13f44da4625bffc7ba5170&oe=5D87B872",
      phone: "996312903849",
      price: 150,
      rating: 5,
      description: `<p>Чтобы получить прекрасную чашку кофе, Sierra импортирует только высококачественный зеленый кофе из Бразилии, 
                    Колумбии, Гватемалы и Эфиопии, и обжаривает зерна в Бишкеке, чтобы гарантировать вам высокое качество и свежесть аромата.
                    Мы очень тщательно отбираем ингредиенты для напитков и блюд из нашего меню, разрабатываем специальные рецепты, 
                    и взаимодействуем со своими сотрудниками и клиентами, чтобы максимально удовлетворять вкусы своих посетителей. 
                    Мы хотим, чтобы наша кухня всегда была на высоте: день за днем, постоянно. Если у вас возникнут проблемы с кухней, 
                    или обслуживанием – сообщите нам об этом, и мы сделаем все возможное, чтобы решить проблему на месте.</p>`,
      extraDescription: `<p>Sierra – это впечатления. Кофе, коктейли, пирожные, панини, супы, салаты, музыка и обслуживание – это частички вашего впечатления. 
                         Если вы выпили чашечку кофе, провели время с друзьями, или поработали за компьютером в нашем кафе, и остались довольны – мы просто счастливы!</p>`,
    },
    {
      category: categoryPlace[0].id,
      user: users[0].id,
      name: "Ak-Keme Hotel",
      address: "Chingiz Aytmatova 93/1, Бишкек",
      email: "RESERVATION@AK-SAI.COM",
      isActive: true,
      mainImage: "https://images.trvl-media.com/hotels/28000000/27810000/27808500/27808448/757fc231_z.jpg",       
      phone: "996312540143",
      price: 50,
      rating: 4,
      description: `<p>Отель Ak-Keme расположен в городе Бишкек. К услугам гостей сезонный открытый бассейн, сад,
                      бар и общий лаундж. К услугам гостей ресторан, круглосуточная стойка регистрации и бесплатный Wi-Fi. 
                      Осуществляется доставка еды и напитков в номер. Отель предназначен для некурящих и расположен в 31 км от святилища Ак-Таш - Оруу-Сай.</p>`,
      extraDescription: `<p>В отеле «Ак-Кеме» можно поиграть в настольный теннис и взять напрокат велосипед или автомобиль.</p>`,
    },
    {
      category: categoryPlace[2].id,
      user: users[0].id,
      name: "Mansion Music Hall",
      address: "Шабдан Баатыра,1 Д/1, Бишкек",
      email: "https://mansion.restoran.kg",
      isActive: true,
      mainImage: "https://www.instagram.com/p/BhgTYaeBGqb/",       
      phone: "996555130003",
      price: 20,
      rating: 4,
      description: `<p>Особенности:	живые выступления, VIP-зона, кальян, go-go, шоу-программа</p>`,
      extraDescription: "",
    },
    {
    category: categoryPlace[0].id,
      user: users[0].id,
      name: "Karagat Hotel",
      address: "ул.Абдрахманова 89A, Каракол",
      email: "http://karagat-hotel.com",
      isActive: true,
      mainImage: "http://media.mice.kg/CACHE/images/hotel/2/203/2139573b-705e-434d-bb4c-43a33efbe3b5/da3e2d69c0839e707a1375eed14e60c5.jpg",       
      phone: "966556399939",
      price: 45,
      rating: 4,
      description: `<p>Отель «Карагат» — это прекрасное место для организации семинаров, бизнес-программ, обучающих тренингов, 
                      корпоративных вечеринок, деловых ужинов, проведения презентаций и конференций в современном конференц-зале.
                      Погрузиться в несравненный комфорт кроватей, общаться в интернете в гостеприимных холлах с разнообразными развлечениями.</p>`,
      extraDescription: `<p>Высококвалифицированные, предупредительные и доброжелательные сотрудники отеля всегда к Вашим услугам и рады обеспечить Вам комфорт и удобство на все время Вашего пребывания в нашем Отеле.</p>`,
    },
    {
    category: categoryPlace[0].id,
      user: users[0].id,
      name: "КАПРИЗ-КАРАКОЛ",
      address: "Горнолыжная база Каракол, Каракол",
      email: "hotel.kapriz@gmail.com",
      isActive: true,
      mainImage: "https://bstatic.com/images/hotel/org/164/164132407.jpg",       
      phone: "996312905170",
      price: 157,
      rating: 4,
      description: `<p>Отель Каприз Каракол - это горнолыжный отель, расположенный на территории горнолыжной базы "Каракол", в 7 км от г. Каракол (Кыргызстан, Ысыккульская область). 
                      Отель включает в себя 48 номеров категории - Twin Room (2 персоны), и 4 номера категории Suite Room (4 персоны). Отель Каприз Каракол - это круглогодичный гостиничный комплекс.</p>`,
      extraDescription: `<p>Отель Каприз-Каракол – это горнолыжный отель расположенный на территории горнолыжной базы Каракол в 7 км от г. Каракол. Отель работает круглый год.</p>`,
      },
      {
     category: categoryPlace[0].id,
      user: users[0].id,
      name: "Marco Polo",
      address: "Иссык-Кульская область, с. Боз-Бешик",
      email: "dostur@mail.kg",
      isActive: true,
      mainImage: "https://www.issykkul.biz/katalog/pansionatyy/marko-polo.aspx#group402-1",       
      phone: "996701751595",
      price: 18,
      rating: 4,
      description: `<p>Чудесный песчаный пляж – визитная карточка отеля «Марко Поло». Собственная пляжная зона, оборудованная шезлонгами и зонтиками, всегда чистая и ухоженная, 
                      дополнит картину полного счастья и принесет не меньше радости, чем озерная вода! На пляже широкий выбор водных развлечений для отдыхающих разного возраста – катамараны, 
                      водные мотоциклы, лодки, бананы, серф-доски, каноэ, водные лыжи.</p>`,
      extraDescription: `<p>Отель располагает номерами класса «Эконом», «Стандарт», «Люкс», расположенными в трехэтажных корпусах, и VIP коттеджами в береговой линии. Уютные номера оснащены всем необходимым для комфортного проживания отдыхающих, а забота обслуживающего персонала с первой минуты настроит Вас на приятный отдых.</p>`,
      },
      {
      category: categoryPlace[5].id,
      user: users[0].id,
      name: "Central Hostel Bishkek",
      address: "Чуй проспект, 227",
      email: "centralhostel312@gmail.com",
      isActive: true,
      mainImage: "https://r-ak.bstatic.com/images/hotel/max1024x768/110/110167701.jpg",
      phone: "996776901060",
      price: 2000,
      rating: 4,
      description: `<p>Хостел Central Bishkek расположен в Бишкеке, в 28 км от святилища Ак-Таш - Оруу-Сай. К услугам гостей номера с кондиционером и общий лаундж. К услугам гостей круглосуточная стойка регистрации, трансфер от/до аэропорта, общая кухня и бесплатный Wi-Fi.

      В каждом номере хостела установлен шкаф для одежды. Гости пользуются общей ванной комнатой.
      
      По утрам в хостеле Central Bishkek сервируется полный английский/ирландский или халяльный завтрак.
      
      К услугам гостей терраса. В окрестностях популярны велосипедные прогулки, а в хостеле Central Bishkek можно взять напрокат велосипед.
      
      Гости могут воспользоваться услугами бизнес-центра, взять напрокат автомобиль для осмотра окрестностей или приобрести подарки в сувенирном магазине.</p>`,
      extraDescription: `<p>Это любимая часть города Бишкек среди наших гостей согласно независимым отзывам.

      Расположение этого варианта — одно из лучших в Бишкеке! Гости довольны им больше, чем расположением других вариантов в этом районе.
      
      Парам особенно нравится расположение — они оценили проживание в этом районе для поездки вдвоем на 9,7.
      
      Здесь лучшее соотношение цены и качества в Бишкеке! По сравнению с другими вариантами в этом городе, гости получают больше за те же деньги.
      
      Мы говорим на вашем языке!</p>
      `
    },
    {
      category: categoryPlace[3].id,
      user: users[0].id,
      name: "Rick's American Diner",
      address: "пр. Чынгыза Айтматова 299в ,ТРЦ Ала-Арча (1 этаж)",
      email: "https://www.instagram.com/dinerkg/",
      isActive: true,
      mainImage: "https://strg1.restoran.kg/neofiles/serve-image/5b179d6e1b42a7081d0fc76f/1170x468/c1/q70",
      phone: "996777979888",
      price: 700,
      rating: 4,
      description: `<p>Закусочная Rick's American Diner в Бишкеке

      В Бишкеке открылся классический американский дайнер — мечта в духе любимых голливудских фильмов - Rick's American Diner.
      
      Сеть топовых ресторанов Navigator Group дарит любимому городу еще одно гастрономическое путешествие.   </p>`,
      extraDescription: `<p>Это рок-н-ролл из  настоящего джукбокса, сочная котлета  в  хрустящей ароматной булке,  потрясающие хот-доги, тако и буррито, пикантные соусы, воздушные панкейки с кленовым сиропом, ароматный кофе, молочные коктейли и улыбчивая команда.

      Пусть станет доброй традицией завтрак, обед или ужин в американском стиле в модном уголке Rick's Diner.</p>
      `
    },
    {
      category: categoryPlace[3].id,
      user: users[0].id,
      name: "Arzu",
      address: "ул. Тоголок Молдо, 7/1, уг. ул. Рыскулова",
      email: "arzukg@gmail.com",
      isActive: true,
      mainImage: "https://strg1.restoran.kg/neofiles/serve-image/594b7da41b42a76e4478c568/1170x468/c1/q70",
      phone: "996558581876",
      price: 800,
      rating: 4,
      description: `<p>Прекрасная восточная кухня в сочетании с изысканной Европейской кухней запада и свежими местными ингредиентами. Мы создаем уникальные вкусы, ароматы и фирменные блюда по авторскому меню, которое предлагает своим гостям по приемлемым ценам.</p>`,
      extraDescription: `<p>Мы принимаем заказы на проведение мероприятий для компаний от 8 до 500 человек. Составим меню и организуем для вас банкет, свадьбу и любой другой праздник так, что он составит наилучшие воспоминания.

      Наши повара удивят вас своим мастерством, официанты — отличным сервисом, а интерьер — красотой и уютом.</p>
      `
    },
    {
      category: categoryPlace[3].id,
      user: users[0].id,
      name: "Navigator",
      address: "ул. Московская, 103",
      email: "https://www.instagram.com/navigator_cafe/",
      isActive: true,
      mainImage: "https://strg1.restoran.kg/neofiles/serve-image/5a94f34a1b42a76175be34c4/1170x468/c1/q70",
      phone: "996772500411",
      price: 1200,
      rating: 4,
      description: `<p>Едва ли найдется в столице заведение, которое может похвастаться богатой историей длиною в 17 лет. Кафе-бар Navigator остается для своих любимых друзей неизменным и верным путеводителем в мире вкуса и удовольствий на протяжении всего этого времени.

      Navigator стал неотъемлемой частью культурного и комфортного отдыха горожан и гостей столицы. Navigator — это любимый для них и родной уголок спокойствия, с которым связаны теплые воспоминания.
      
      Что делает это заведение одним из лучших в городе? Ответ прост: это приверженность к лучшим ресторанным традициям мира, профессионализм и слаженность команды, а самое главное — искренняя любовь к каждому гостю, благодаря чему, случайный посетитель уже после первого визита трансформируется в нашего друга и постоянного гостя.</p>`,
      extraDescription: `<p>Каждый гость найдет в кафе- баре Navigator свой личный кусочек счастья, будь то чашка ароматного кофе во всем его многообразии видов , или чудесный десерт, который обладает магическими свойствами.
      Navigator, по мнению наших друзей, лучшее уютное местечко в Бишкеке, со своей непередаваемой комфортной атмосферой и лучшим профессиональным обслуживанием.</p>`
    },
    {
      category: categoryPlace[2].id,
      user: users[0].id,
      name: "Retro Metro",
      address: "Чынгыза Айтматова проспект, 24",
      email: "https://www.instagram.com/retro_metro_nk/?hl=ru",
      isActive: true,
      mainImage: "https://strg2.restoran.kg/neofiles/serve-image/57edfdb5b7f1d969fe000a7b/1170x468/c1/q70",
      phone: "996705000888",
      price: 700,
      rating: 4,
      description: `<p>Ночной клуб Ретро-Метро
      В ходе своей деятельности на протяжении 12 лет, ночной клуб «Ретро-Метро» зарекомендовал себя, как отличное место для отдыха и завоевал доверие у наших постоянных клиентов.
      Клуб обладает одним из крупнейших клубных танцполов в Кыргызстане и принимает до 8000 клиентов в месяц.</p>`,
      extraDescription: `<p>Прекрасное дополнение активного «танцевального» отдыха – это караоке зал «Ретро-Метро», в котором гости могут раскрыться в творческом певческом порыве.
      Караоке зал - одна из самых удачных площадок для проведения корпоративных или «закрытых» мероприятий.  </p>`
    }
  );


  const articles = await Articles.create(
    {
      user: users[0].id,
      title: "Иссык-Куль",
      isActive: true,
      mainImage: "https://sputnik.kg/images/102705/44/1027054476.jpg",
      description: `<p>Самое большое озеро в Киргизии, бессточное, входит в 30 крупнейших по площади озёр мира и на седьмом месте в списке самых глубоких озёр. Расположено в северо-восточной части республики, между хребтами Северного Тянь-Шаня: Кюнгёй-Ала-Тоо и Терскей Ала-Тоо на высоте 1609 м над уровнем моря. Озеро бессточное, в него впадает до 80 сравнительно небольших притоков.</p>`,
      extraDescription: `<p>Редкое сочетание морского и горного климатов привлекает многочисленных отдыхающих и туристов. Озеро Иссык-Куль является главным источником доходов от туризма в Киргизии. Тем не менее на побережье озера Иссык-Куль до сих пор немало неосвоенных мест, на месте которых постепенно появляются новые комфортабельные места отдыха.</p>`
    },
    {
      user: users[0].id,
      title: "Бурана",
      isActive: true,
      mainImage: "http://static-2.akipress.org/127/.storage/limon2/images/may2015/6b759bfec8d216cb3e3ec2ffaa65918f.jpg",
      description: `<p>Минарет X—XI веков империи Караханидов в Чуйской долине на севере Киргизии. Расположена в 80 км от столицы Бишкека, в 12 км к юго-западу от киргизского города Токмак по дороге в ущелье Кегеты киргизского хребта, на левом берегу реки Чу. Башня входит в состав особо охраняемого археологическо-архитектурного комплекса «Башня Бурана». Башня Бурана является частью археолого-архитектурного киргизского музея и охраняется государством как памятник культурного наследия</p>`,
      extraDescription: `<p>Также возле башни можно увидеть небольшую коллекцию каменных истуканов - балбалов. Небольшие каменные фигуры создавались для того, чтобы почтить память усопшего, иногда их помещали на месте захоронения. Эти образцы каменных изделий 6-го века н. э. дополнены петроглифами II века до нашей эры, которые можно увидеть у башни Бурана.

      Хоть музей при башне небольшой, он довольно интересен своими артефактами. Расположение Баласагына на Шелковом пути сделало его центром для торговцев, пересекающих континент с востока на запад. Монеты, керамика и другие артефакты показывают разнообразие региона и его легендарную историю.</p>`
    },
    {
      user: users[0].id,
      title: "Озеро Сон-Куль",
      isActive: true,
      mainImage: "https://ot.kg/files/images/catalog/catalog_4faee23862907f40194d9ea46529186e.jpg",
      description: `<p>Сон-Куль это горное озеро Тянь-Шаня. Один из вариантов перевода названия звучит, как «Последнее Озеро».

      Сон-Куль это второе по величине озеро в Кыргызстане, расположенное на высоте 3016 метров над уровнем моря, 29 км в длину и 18 км в ширину. Максимальная глубина озера составляет 13.2 метра. Средняя температура воды -3.5° C , а летом вода прогревается до 11° C . Температура озера зимой опускается до -20° C . 200 дней в году озеро укрыто снегами и в зимнее время подняться к нему практически невозможно.</p>`,
      extraDescription: `<p>Природа озера очень богата растительностью, и редкими видами животных и птиц хотя в округе нет ни одного дерева. В озере совершенно не было рыбы до тех пор, пока она была специально завезена в 1959 году. </p>`
    },
    {
      user: users[0].id,
      title: "Река Нарын",
      isActive: true,
      mainImage: "https://rutraveller.ru/icache/place/1/239/042/123942_603x354.jpg",
      description: `<p>Река Нарын протекает через Кыргызстан и Узбекистан, её длина составляет 807 км, а бассейн реки равен 59 000 кв. км. Река начинается с ледников в Центральном Тянь-Шане и становится рекой Нарын с слиянием рек Большой и Малый Нарын.

      Река Нарын протекает через узкие ущелья и равнины, начинаясь с Нарынского государственного национального парка и пересекая города Нарын, Таш-Кумыр и Учкурган. Рядом с этой частью реки находятся горы Нарын Тоо, которые простираются на 130 км и достигают максимальной высоты 4530 м. Река широко используется для орошения, из её вод сформировано несколько каналов. Вдоль реки находится несколько крупных гидроэлектростанций, в том числе крупнейшее в Кыргызстане Токтогульское водохранилище.
      
      </p>`,
      extraDescription: `<p>Минуя Токтогуль, река Нарын течет через Джалал-Абад в Узбекистан, где она сливается с рекой Кара-Дарья, чтобы сформировать Сырдарью, и впадает в Аральское море. Большое количество воды поступает в Узбекистан для орошения полей из кыргызских рек, поэтому право на использование воды из реки Нарын может стать причиной конфликта между двумя странами.
      </p>`
    },
    {
      user: users[0].id,
      title: "Климат в Кыргызстане",
      isActive: true,
      mainImage: "http://kabarlar.org/uploads/posts/2018-12/1544259744_1031077888.jpg",
      description: `<p>Континентальный, сухой. Ввиду сильной пересеченности рельефа на территории Киргизстана климатические условия довольно неоднородны - в высокогорных районах Тянь-Шаня погода имеет все признаки субполярного климата, в юго-западных областях (Ферганская долина) - субтропического, а в северных предгорьях климат почти умеренный. Характерной чертой является сухость воздуха над всей территорией страны, благодаря чему здесь в среднем 247 солнечных дней в году.

      Среднеянварская температура колеблется от -1 С до -8 C в долинах, и до -18-27 C в высокогорьях. Наиболее холодный месяц - январь, когда из сибирского региона, Монголии и Казахстана приходят холодные воздушные массы, чье влияние усугубляется стоковыми ветрами с окрестных гор. Летом (июль) в долинах от +15 С до +27 С, в предгорьях от +10 С до +24 С, а в высокогорных районах до +5-11 C. Причем, в отличие от зимнего периода, жаркие воздушные массы с территории северо-западных и западных регионов Средней Азии почти не проникают в межгорные котловины Киргизстана. Однако южные склоны нагреваются довольно сильно. Температура воздуха на побережье Иссык-Куля менее контрастна и круглый год умерена (зимой около +2 С, летом - +18-22 С).
      </p>`,
      extraDescription: `<p>Годовое количество осадков колеблется от 180 мм на востоке страны до 600 мм в юго-западных регионах. Максимальное количество осадков выпадает в начале лета и в осенне-зимний период. Причем к середине зимы толщина снежного покрова на западных склонах гор может доходить до 1 метра, а в высокогорьях снег лежит круглый год.</p>`
    },
  );
  const eventTypes = await EventTypes.create(
    {
      user: users[0].id,
      name: "Festival"
    },
    {
      user: users[0].id,
      name: "Night Live"
    },
    {
      user: users[0].id,
      name: "Celebration"
    },
    {
      user: users[0].id,
      name: "For children"
    }
  );
    
  const events = await Events.create(
    {
      eventTypes: eventTypes[0].id,
      user: users[0].id,
      title: "Иссык-Куль",
      isActive: true,
      mainImage: "https://sputnik.kg/images/102705/44/1027054476.jpg",
      description: `<p>Самое большое озеро в Киргизии, бессточное, входит в 30 крупнейших по площади озёр мира и на седьмом месте в списке самых глубоких озёр. Расположено в северо-восточной части республики, между хребтами Северного Тянь-Шаня: Кюнгёй-Ала-Тоо и Терскей Ала-Тоо на высоте 1609 м над уровнем моря. Озеро бессточное, в него впадает до 80 сравнительно небольших притоков.</p>`,
      extraDescription: `<p>Редкое сочетание морского и горного климатов привлекает многочисленных отдыхающих и туристов. Озеро Иссык-Куль является главным источником доходов от туризма в Киргизии. Тем не менее на побережье озера Иссык-Куль до сих пор немало неосвоенных мест, на месте которых постепенно появляются новые комфортабельные места отдыха.</p>`
    },
  );

  const discovery = await Discovery.create(
    {
      user: users[0].id,
      title: "Иссык-Кульs",
      isActive: true,
      mainImage: "https://sputnik.kg/images/102705/44/1027054476.jpg",
      description: `<p>Самое большое озеро в Киргизии, бессточное, входит в 30 крупнейших по площади озёр мира и на седьмом месте в списке самых глубоких озёр. Расположено в северо-восточной части республики, между хребтами Северного Тянь-Шаня: Кюнгёй-Ала-Тоо и Терскей Ала-Тоо на высоте 1609 м над уровнем моря. Озеро бессточное, в него впадает до 80 сравнительно небольших притоков.</p>`,
      extraDescription: `<p>Редкое сочетание морского и горного климатов привлекает многочисленных отдыхающих и туристов. Озеро Иссык-Куль является главным источником доходов от туризма в Киргизии. Тем не менее на побережье озера Иссык-Куль до сих пор немало неосвоенных мест, на месте которых постепенно появляются новые комфортабельные места отдыха.</p>`
    },
  );

  return connection.close()
};

run().catch(error => {
  console.log('Something wrong happened ...', error);
});
