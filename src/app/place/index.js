const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Place = require('../../models/Place');
const verifyToken = require('../../middleware/verifyToken');
const config = require('../../config');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const router = express.Router();

const filesUpload = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

//post place
router.post('/', filesUpload, (req, res) => {
  const place = new Place(req.body);
  
  if (req.files) {
    Object.keys(req.files).map(file => {
    if (file === 'mainImage') {
      place.mainImage = req.files[file][0].filename
    }
    if (file === 'images') {
      req.files.images.map(fieldname=>place.images.push(fieldname.filename))}
    })
  }  

  console.log(place, 'place')
  
  place.isActive = true;
  place.save()
    .then(result => res.send(result))
    .catch(() => res.sendStatus(400))
});

//get places
router.get('/', (req, res)=> {
  Place.find({isActive: true})
    .populate('user')
    .populate('category')
    .populate('country')
    .populate('cities')
    .sort('-createDate')
    .then(result => res.send(result))
    .catch(() => res.sendStatus(404))
});



// get places
router.get('/', function (req, res) {
  var page = req.query.skip || 0;
  var limit = req.query.limit || 50;
  const category = req.query.category
  const cities = req.query.cities
  const search = req.query.search;
  if (search) {
    Place.find(
      { $text: { $search: search } },
      { score: { $meta: "textScore" } })
      .sort({ score: { $meta: 'textScore' } })
      .populate('user')
      .populate('category')
      .populate('country')
      .populate('cities')
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  }else if (category) {
    Place.find(
      { category: category, isActive: true })
      .populate('user')
      .populate('category')
      .populate('country')
      .populate('cities')
      .sort('-createDate')
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  }else if (cities) {
    Place.find(
      { cities: cities, isActive: true })
      .populate('user')
      .populate('category')
      .populate('country')
      .populate('cities')
      .sort('-createDate')
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  } else {
    Place.find({ isActive: true })
      .populate('user')
      .populate('category')
      .populate('country')
      .populate('cities')
      .sort('-createDate')
      .lean()
      .skip(Number(page))
      .limit(Number(limit))
      .then(result => res.send(result))
      .catch(() => res.sendStatus(404))
  }
});


// get places by id
router.get('/:id', function (req, res) {
  Place.findById(req.params.id)
    .then(PlaceFound => {
      if (!PlaceFound) {
        return res.status(404).end();
      }
      return res.status(200).json(PlaceFound);
    })
    .catch(err => console.log(err))
});



//edit places
router.patch('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Place.findById(req.params.id, (err, place) => {
      place.set({ ...req.body, updateDate: new Date(), isModerated: true });
      place.save((saveErr, updated) => {
        res.send({ updated })
      })
    })
  } else if (req.user._id.equals(req.params.id)) {
    Place.find(req.params.id, (err, place) => {
      place.set({ ...req.body, updateDate: new Date(), isModerated: true });
      place.save((saveErr, updated) => {
        res.send(updated)
      })
    })
  } else {
    res.sendStatus(400)
  }

});

// All edit places
router.put('/:id', (req, res) => {
  if (req.file) {
    place.mainImage = req.file.filename
  }
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Place.findById(req.params.id, (err, place) => {
      place.category = req.body.category;
      place.user = req.body.user;
      place.name = req.body.name;
      place.address = req.body.address;
      place.country = req.body.country;
      place.cities = req.body.cities;
      place.email = req.body.email;
      place.phone = req.body.phone;
      place.description = req.body.description;
      place.extraDescription = req.body.extraDescription;
      place.price = req.body.price;
      place.rating = req.body.rating;
      place.updatedDate = new Date();
      place.save((saveErr, updatedUser) => {
        res.send({ updatedUser });
      });
    })
  } else if (req.user.roles.name === 'user') {
    Place.findById(req.params.id, (err, place) => {
      if (req.user._id.equals(place.user)) {
        Place.findById(req.params.id, (err, place) => {
          place.category = req.body.category;
          place.user = req.body.user;
          place.name = req.body.name;
          place.address = req.body.address;
          place.country = req.body.country;
          place.cities = req.body.cities;
          place.email = req.body.email;
          place.phone = req.body.phone;
          place.description = req.body.description;
          place.extraDescription = req.body.extraDescription;
          place.price = req.body.price;
          place.rating = req.body.rating;
          place.updatedDate = new Date();
          place.save((saveErr, updatedUser) => {
            res.send({ updatedUser });
          });
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});

//delete place by id
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Place.findById(req.params.id, (err, place) => {
      place.remove(() => {
        res.send('Delete Place');
      })
    })
  } else if (req.user.roles.name === 'user') {
    Place.findById(req.params.id, (err, place) => {
      if (req.user._id.equals(place.user)) {
        place.remove(() => {
          res.send('Delete Place');
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});


module.exports = router;