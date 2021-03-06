const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
require("./db");
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/api/messages', require('./controllers/get_messages'))
app.get("/api/user", require("./controllers/get_user"));
app.get("/api/profile", require("./controllers/get_anUser"));

app.post("/api/login", require("./controllers/login"));
app.post("/api/signup", require("./controllers/signup"));

app.post(
  "/api/restaurant",
  multer({ storage: multer.memoryStorage() }).single("file"),
  require("./controllers/post_restaurant")
);
app.post(
  "/api/event",
  multer({ storage: multer.memoryStorage() }).single("file"),
  require("./controllers/post_event")
);
app.get("/api/getEvent", require("./controllers/get_event"));
app.patch("/api/events/:id", require("./controllers/patch_event"));
app.patch("/api/likes/:id", require("./controllers/patch_event_likes"));



app.post("/api/restaurant", require("./controllers/post_restaurant"));
app.get("/api/getRestaurant", require("./controllers/get_restaurant"));

app.get("/api/getanEvent/:id", require("./controllers/get_anEvent"));
app.get("/api/getanRestaurant/:id", require("./controllers/get_anRestaurant"));

app.get("/api/getuserevents", require("./controllers/get_user_events"));

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log(`Ready on port ${process.env.PORT}`);
  }
});
