const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) =>{
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/', (req, res) => {
  res.send('user')
});





module.exports = router;