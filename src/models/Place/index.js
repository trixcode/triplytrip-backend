const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryPlace',
    required: true,
    text: true
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
    text: true,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    text: true
  },
  cities: {
    type: Schema.Types.ObjectId,
    ref: 'Cities',
    text: true,
  },
  location: [{
    latitude: {
      type: String,
      text: true,
    },
    longitude: {
      type: String,
      text: true,
    }
  }],
  mainImage: {
    type: String
  },
  email: {
    type: String,
    text: true,
    required: true
  },
  phone: {
    type: String,
    text: true,
  },
  description: {
    type: String,
    text: true,
  },
  extraDescription: {
    type: String,
    text: true,
  },
  price: {
    type: Number,
    text: true,
  },
  rating: {
    type: Number,
    text: true,
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
  updateDate: String
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;