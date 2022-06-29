const { Schema } = require('mongoose');

// This is a subDocument schema, it won't become its own model but we'll use it as the schema for the User's `savedCars` array in User.js
const carSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved car id from rapidApiCars
  carId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = carSchema;
