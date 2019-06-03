const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const CountryModels = mongoose.model('Country', CountrySchema);

module.exports = CountryModels;