const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    type: String,
    required: true
  },

  mainImage: {
    type: String
  },
  
  description: String,
  extraDescription: String,

  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  isModerated: {
    type: Boolean,
    required: true,
    default: false
  },

  createDate: {
    type: String,
    default: new Date(),
    required: true
  },

  updateDate: String
});

const ArticlesModel = mongoose.model('Articles', ArticlesSchema);

module.exports = ArticlesModel;