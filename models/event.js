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
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String,
    required: [true, "Time is requried"]
  },
  person: {
    type: Number
  },
  image: {
    type: String
  },
  city: {
    type: String
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
