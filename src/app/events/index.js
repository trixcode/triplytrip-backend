const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Events = require('../../models/Events');
const verifyToken = require('../../middleware/verifyToken');
const config = require('../../config');

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

//get Eventss
router.get('/', function (req, res) {	
  var page = req.query.skip || 0;	
  var limit = req.query.limit || 50;	
  Events.find({ isActive: true })	
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
});

// get Eventss by id
router.get('/:id', function (req, res) {
  Events.findById(req.params.id)
  .then(EventsFound => {
    if(!EventsFound){
      return res.status(404).end(); 
    }
    return res.status(200).json(EventsFound);
  })
  .catch(err => console.log(err))
});

//post Events
router.post('/', [verifyToken, upload.single('mainImage', 'images')], (req,res)=>{
  const Events = new Events(req.body);

  if (req.file) Events.mainImage = req.file.filename;

  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Events.isActive = true;
    Events.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else if (req.user.roles.name === 'user'){
    Events.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(401))
  }
});


//edit Eventss
router.patch('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Events.findById(req.params.id, (err, Events)=>{
      Events.set({...req.body, updateDate: new Date(), isModerated: true});
      Events.save((saveErr, updated)=>{
        res.send({updated})
      })
    })
  } else if (req.user._id.equals(req.params.id)){
    Events.find(req.params.id, (err, Events) => {
      Events.set({...req.body, updateDate: new Date(), isModerated: true});
      Events.save((saveErr, updated) => {
        res.send(updated)
      })
    })
  } else {
    res.sendStatus(400)
  }

});

// All edit Eventss
router.put('/:id', (req, res) => {
  if (req.file){
    Events.mainImage = req.file.filename
  }
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Events.findById(req.params.id, (err, Events)=>{
      Events.category = req.body.category;
      Events.user = req.body.user;
      Events.name = req.body.name;
      Events.address = req.body.address;
      Events.country = req.body.country;
      Events.cities = req.body.cities;
      Events.email = req.body.email;
      Events.phone = req.body.phone;
      Events.description = req.body.description;
      Events.extraDescription = req.body.extraDescription;
      Events.price = req.body.price;
      Events.rating = req.body.rating;
      Events.updatedDate = new Date();
      Events.save((saveErr, updatedUser) => {
        res.send({ updatedUser });
      });
    })
  } else if (req.user.roles.name === 'user') {
    Events.findById(req.params.id, (err, Events) => {
      if (req.user._id.equals(Events.user)) {
        Events.findById(req.params.id, (err, Events) => {
          Events.category = req.body.category;
          Events.user = req.body.user;
          Events.name = req.body.name;
          Events.address = req.body.address;
          Events.country = req.body.country;
          Events.cities = req.body.cities;
          Events.email = req.body.email;
          Events.phone = req.body.phone;
          Events.description = req.body.description;
          Events.extraDescription = req.body.extraDescription;
          Events.price = req.body.price;
          Events.rating = req.body.rating;
          Events.updatedDate = new Date();
          Events.save((saveErr, updatedUser) => {
            res.send({updatedUser});
          });
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});

//delete Events by id
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Events.findById(req.params.id, (err, Events)=>{
      Events.remove(()=>{
        res.send('Delete Events');
      })
    })
  } else if (req.user.roles.name === 'user') {
    Events.findById(req.params.id, (err, Events)=>{
      if (req.user._id.equals(Events.user)){
        Events.remove(()=>{
          res.send('Delete Events');
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});


module.exports = router;