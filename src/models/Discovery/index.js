const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscoverySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  mainImage: {
    type: String
  },
  
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

  updateDate: String,
  countDestinations: Number,
  cities: {
    type: Schema.Types.ObjectId,
    ref: 'Cities',
    required: true
  },
});

const DiscoveryModel = mongoose.model('Discovery', DiscoverySchema);

module.exports = DiscoveryModel;