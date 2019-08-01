const db = require("../db");
const mongoose = require("mongoose");

// schema
const db_event = db.model("event", {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Event Author is required"]
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  datetime: {
    type: Date,
    required: true
  },
  person: {
    type: Number,
    required: true
  },
  file: {
    type: String,
    default: "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ]
});

module.exports = db_event;
