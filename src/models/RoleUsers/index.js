const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createData: {
    type: String,
    required: true,
    default: new Date()
  },
  updatedDate: String
});

const RoleUsers = mongoose.model('RoleUser', RoleSchema);

module.exports = RoleUsers;