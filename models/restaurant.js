const db = require("../db");
const mongoose = require("mongoose");

// schema
const db_restaurant = db.model("restaurant", {
  author: {
    type: String,
    ref: "user",
    required: [true, "Author is required"]
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  address: {
    type: String
  },
  tel: {
    type: String
  },
  price: {
    type: String
  },
  file: {
    type: String,
		default: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
  },
  city: {
    type: String
  },
  country: {
    type: String
  }
});

module.exports = db_restaurant;
