const db_restaurant = require("../models/restaurant");
const jwt = require("jsonwebtoken");
const path = require("path");
const cloudinary = require("cloudinary");
const Datauri = require("datauri");

const data_uri = new Datauri();

const create_uri = file => {
  return data_uri.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// upload

const upload_file = file => {
  return new Promise(function(resolve, reject) {
    let uri = create_uri(file).content;
    cloudinary.uploader
      .upload(uri)
      .then(saved => {
        console.log("saved", saved);
        resolve(saved);
      })
      .catch(err => {
        console.log("err", err);
        reject(err);
      });
  });
};

const create_restaurant = body => {
  return new Promise(function(resolve, reject) {
    db_restaurant
      .create(body)
      .then(data => {
        console.log("data", data);
        db_restaurant
          .findById(data._id)
          .populate({
            path: "author",
            select: "name email"
          })
					.then(restaurant => {
						console.log("then restaurant", restaurant);
            resolve(restaurant);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = (req, res) => {
  // token
  let token = req.headers.authorization.split(" ")[1];
  console.log("token", token);
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log("err", err);
    } else if (decoded) {
      console.log("decoded", decoded);
      req.body.author = decoded._id;
      // file
      if (req.file && req.file != null) {
        console.log("file", req.file);
        upload_file(req.file)
          .then(file => {
            console.log("file", file);
            req.body.file = file.url;
            // message with file
            create_restaurant(req.body)
              .then(restaurant => {
                console.log("restaurant", restaurant);
                res.send(restaurant);
              })
              .catch(err => {
                res.send(err);
              });
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        // message no file
        delete req.body.file;
        console.log("req.body", req.body);
        create_restaurant(req.body)
          .then(restaurant => {
            res.send(restaurant);
          })
          .catch(err => {
            res.send(err);
          });
      }
    }
  });
};
