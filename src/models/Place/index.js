const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryPlace',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  cities: {
    type: Schema.Types.ObjectId,
    ref: 'Cities',
    required: true
  },
  location: [{
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  }],
  mainImage: {
    type: String
  },
  images: [{
    image: String
  }],
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: String,
  extraDescription: String,
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
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