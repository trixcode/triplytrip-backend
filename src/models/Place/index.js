const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryPlace',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    type: String,
    text: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    text: true,
  },
  cities: {
    type: Schema.Types.ObjectId,
    ref: 'Cities',
    text: true,
  },
  location: [{
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    }
  }],
  mainImage: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  description: {
    type: String,
  },
  extraDescription: {
    type: String,
  },
  price: Number,
  rating: Number,
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

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;