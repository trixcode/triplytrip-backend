const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  dbURL: 'mongodb://localhost/triplytrip',
  mongoOptions: {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  secret: 'supersecret',
  apiHost: process.env.API_HOST || 'http://52.58.62.46/' 
};
