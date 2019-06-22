const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Articles = require('../../models/Articles');
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

//get Articless
router.get('/', function (req, res) {	
  var limit = req.query.limit || 50;	
  Articles.find({ isActive: true })	
    .populate('user')	
    .populate('category')	    
    .populate('country')	   
    .populate('cities')	    
    .sort('-createDate')	    
    .lean()	
    .limit(Number(limit))	
    .then(result => res.send(result))
    .catch(() => res.sendStatus(404))
});

// get Articless by id
router.get('/:id', function (req, res) {
  Articles.findById(req.params.id)
  .then(ArticlesFound => {
    if(!ArticlesFound){
      return res.status(404).end(); 
    }
    return res.status(200).json(ArticlesFound);
  })
  .catch(err => console.log(err))
});

//post Articles
router.post('/', [verifyToken, upload.single('mainImage', 'images')], (req,res)=>{
  const Articles = new Articles(req.body);

  if (req.file) Articles.mainImage = req.file.filename;

  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Articles.isActive = true;
    Articles.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else if (req.user.roles.name === 'user'){
    Articles.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(401))
  }
});


//edit Articless
router.patch('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Articles.findById(req.params.id, (err, Articles)=>{
      Articles.set({...req.body, updateDate: new Date(), isModerated: true});
      Articles.save((saveErr, updated)=>{
        res.send({updated})
      })
    })
  } else if (req.user._id.equals(req.params.id)){
    Articles.find(req.params.id, (err, Articles) => {
      Articles.set({...req.body, updateDate: new Date(), isModerated: true});
      Articles.save((saveErr, updated) => {
        res.send(updated)
      })
    })
  } else {
    res.sendStatus(400)
  }

});

// All edit Articless
router.put('/:id', (req, res) => {
  if (req.file){
    Articles.mainImage = req.file.filename
  }
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Articles.findById(req.params.id, (err, Articles)=>{
      Articles.category = req.body.category;
      Articles.user = req.body.user;
      Articles.name = req.body.name;
      Articles.address = req.body.address;
      Articles.country = req.body.country;
      Articles.cities = req.body.cities;
      Articles.email = req.body.email;
      Articles.phone = req.body.phone;
      Articles.description = req.body.description;
      Articles.extraDescription = req.body.extraDescription;
      Articles.price = req.body.price;
      Articles.rating = req.body.rating;
      Articles.updatedDate = new Date();
      Articles.save((saveErr, updatedUser) => {
        res.send({ updatedUser });
      });
    })
  } else if (req.user.roles.name === 'user') {
    Articles.findById(req.params.id, (err, Articles) => {
      if (req.user._id.equals(Articles.user)) {
        Articles.findById(req.params.id, (err, Articles) => {
          Articles.category = req.body.category;
          Articles.user = req.body.user;
          Articles.name = req.body.name;
          Articles.address = req.body.address;
          Articles.country = req.body.country;
          Articles.cities = req.body.cities;
          Articles.email = req.body.email;
          Articles.phone = req.body.phone;
          Articles.description = req.body.description;
          Articles.extraDescription = req.body.extraDescription;
          Articles.price = req.body.price;
          Articles.rating = req.body.rating;
          Articles.updatedDate = new Date();
          Articles.save((saveErr, updatedUser) => {
            res.send({updatedUser});
          });
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});

//delete Articles by id
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Articles.findById(req.params.id, (err, Articles)=>{
      Articles.remove(()=>{
        res.send('Delete Articles');
      })
    })
  } else if (req.user.roles.name === 'user') {
    Articles.findById(req.params.id, (err, Articles)=>{
      if (req.user._id.equals(Articles.user)){
        Articles.remove(()=>{
          res.send('Delete Articles');
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});


module.exports = router;