const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  dbURL: 'mongodb://mongo:27017/tripletrip',
  mongoOptions: {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  secret: 'supersecret'
};