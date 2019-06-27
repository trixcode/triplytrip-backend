const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const Discovery = require('../../models/Discovery');
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

//get Discoverys
router.get('/', function (req, res) {	
  var page = req.query.skip || 0;	
  var limit = req.query.limit || 50;	
  Discovery.find({ isActive: true })	
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

// get Discoverys by id
router.get('/:id', function (req, res) {
  Discovery.findById(req.params.id)
  .then(DiscoveryFound => {
    if(!DiscoveryFound){
      return res.status(404).end(); 
    }
    return res.status(200).json(DiscoveryFound);
  })
  .catch(err => console.log(err))
});

//post Discovery
router.post('/', [verifyToken, upload.single('mainImage', 'images')], (req,res)=>{
  const Discovery = new Discovery(req.body);

  if (req.file) Discovery.mainImage = req.file.filename;

  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Discovery.isActive = true;
    Discovery.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(400))
  } else if (req.user.roles.name === 'user'){
    Discovery.save()
      .then(result => res.send(result))
      .catch(() => res.sendStatus(401))
  }
});


//edit Discoverys
router.patch('/:id', verifyToken, (req, res)=>{
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator') {
    Discovery.findById(req.params.id, (err, Discovery)=>{
      Discovery.set({...req.body, updateDate: new Date(), isModerated: true});
      Discovery.save((saveErr, updated)=>{
        res.send({updated})
      })
    })
  } else if (req.user._id.equals(req.params.id)){
    Discovery.find(req.params.id, (err, Discovery) => {
      Discovery.set({...req.body, updateDate: new Date(), isModerated: true});
      Discovery.save((saveErr, updated) => {
        res.send(updated)
      })
    })
  } else {
    res.sendStatus(400)
  }

});

// All edit Discoverys
router.put('/:id', (req, res) => {
  if (req.file){
    Discovery.mainImage = req.file.filename
  }
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Discovery.findById(req.params.id, (err, Discovery)=>{
      Discovery.category = req.body.category;
      Discovery.user = req.body.user;
      Discovery.name = req.body.name;
      Discovery.address = req.body.address;
      Discovery.country = req.body.country;
      Discovery.cities = req.body.cities;
      Discovery.email = req.body.email;
      Discovery.phone = req.body.phone;
      Discovery.description = req.body.description;
      Discovery.extraDescription = req.body.extraDescription;
      Discovery.price = req.body.price;
      Discovery.rating = req.body.rating;
      Discovery.updatedDate = new Date();
      Discovery.save((saveErr, updatedUser) => {
        res.send({ updatedUser });
      });
    })
  } else if (req.user.roles.name === 'user') {
    Discovery.findById(req.params.id, (err, Discovery) => {
      if (req.user._id.equals(Discovery.user)) {
        Discovery.findById(req.params.id, (err, Discovery) => {
          Discovery.category = req.body.category;
          Discovery.user = req.body.user;
          Discovery.name = req.body.name;
          Discovery.address = req.body.address;
          Discovery.country = req.body.country;
          Discovery.cities = req.body.cities;
          Discovery.email = req.body.email;
          Discovery.phone = req.body.phone;
          Discovery.description = req.body.description;
          Discovery.extraDescription = req.body.extraDescription;
          Discovery.price = req.body.price;
          Discovery.rating = req.body.rating;
          Discovery.updatedDate = new Date();
          Discovery.save((saveErr, updatedUser) => {
            res.send({updatedUser});
          });
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});

//delete Discovery by id
router.delete('/:id', verifyToken, (req, res) => {
  if (req.user.roles.name === 'admin' || req.user.roles.name === 'moderator'){
    Discovery.findById(req.params.id, (err, Discovery)=>{
      Discovery.remove(()=>{
        res.send('Delete Discovery');
      })
    })
  } else if (req.user.roles.name === 'user') {
    Discovery.findById(req.params.id, (err, Discovery)=>{
      if (req.user._id.equals(Discovery.user)){
        Discovery.remove(()=>{
          res.send('Delete Discovery');
        })
      } else {
        res.sendStatus(403)
      }
    })
  }
});


module.exports = router;