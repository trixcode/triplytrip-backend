const jwt = require('jsonwebtoken');
const Users = require('../../models/Users');


const index = (req, res, next) => {
  const bearerHeader = req.headers['token'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];

    if (req.user) next();
    if (req.token === 'undefined' || req.token === 'null') {
      next();
    } else {
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
          res.sendStatus(403);

        } else {
          Users.findById(authData.user._id)
            .populate('roles')
            .exec((err, obj) => {
              if (err) {
                res.sendStatus(403)
              } else {

                req.user = obj;
                next()
              }
            });
        }
      })
    }
  } else {
    next()
  }
};

module.exports = index;