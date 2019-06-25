const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventTypesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createData: {
    type: String,
    required: true,
    default: new Date()
  },
  updatedDate: String,
  description: String,
});

const EventTypes = mongoose.model('EventTypes', EventTypesSchema);

module.exports = EventTypes;