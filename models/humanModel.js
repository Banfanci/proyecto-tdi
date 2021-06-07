const mongoose = require('mongoose');

const humanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  age: {
    type: Number,
    required: [true, 'Please tell us your age'],
  },
});

const Human = mongoose.model('Human', humanSchema);

module.exports = Human;
