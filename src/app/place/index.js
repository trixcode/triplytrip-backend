const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Place = require('../../models/Place');
const verifyToken = require('../../middleware/verifyToken');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) =>{
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});
const router = express.Router();

router.get('/', verifyToken, async (req, res)=> {
  try {
    const perPage = 10
      , page = Math.max(0, req.param('page'));

    let published = {isActive: true};
    if (req.user.roles.name === 'user'){
      published = {
        $or: [
          {isActive: true},
          {user: req.user._id}
        ]
      }
    } else if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
      published = {}
    }
    const place = await Place.find(published)
      .populate('user')
      .populate('category')
      .populate('country')
      .populate('cities')
      .limit(perPage)
      .skip(perPage * page)
      .sort('-createDate');
    return res.send(place)
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send(e)
    }
    return res.status(500).send(e)
  }
});
router.post('/', [verifyToken, upload.single('mainImage', 'images')], (req,res)=>{
  const place = new Place(req.body);

  if (req.file){
    place.mainImage = req.file.filename;
  }
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    place.isActive = true;
    place.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else if (req.user.roles.name === 'user'){
    place.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(401))
  }
});
router.patch('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Place.findById(req.params.id, (err, place)=>{
      place.set({...req.body, updateDate: new Date(), isModerated: true});
      place.save((saveErr, updated)=>{
        res.send({updated})
      })
    })
  } else if (req.user.roles === 'user'){
    Place.find(req.params.id, (err, place) => {
      place.set({...req.body, updateDate: new Date(), isModerated: true});
      place.save((saveErr, updated) => {
        res.send(updated)
      })
    })
  }

});
router.put('/:id', (req, res) => {
  Place.findById(req.params.id, (err, place)=>{
    if (req.file){
      place.mainImage = req.file.filename
    }
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
});
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Place.findById(req.params.id, (err, place)=>{
      place.remove(()=>{
        res.send('Delete Place');
      })
    })
  }
});


module.exports = router;