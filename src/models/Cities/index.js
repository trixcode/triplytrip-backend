const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitiesSchema = new Schema({
  countryId: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String
});

const CitiesModels = mongoose.model('Cities', CitiesSchema);

module.exports = CitiesModels;