const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  eventTypes: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },

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
  rating: Number,
  address: String,
  price: Number,
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },


  updateDate: String,
  
});

const EventsModel = mongoose.model('Events', EventsSchema);

module.exports = EventsModel;