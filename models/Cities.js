const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitiesSchema = new Schema({
  CountryId: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const CitiesModels = mongoose.model('Cities', CitiesSchema);

module.exports = CitiesModels;