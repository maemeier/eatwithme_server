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
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "fyni", (err, decoded) => {
    if (decoded._id === '5d4841b0b5e91e1fe84b0407') {
      console.log("decoded", decoded);
			console.log('decode', decoded._id);
      req.body.author = decoded._id;
			// console.log("req body author", req.body.author);
      req.body.guests = [];
			// console.log("req body guests", req.body.guests);
      req.body.guests.push(decoded._id);
			// console.log("req body guests ", req.body.guests);
      // file
      if (req.file && req.file != null) {
        console.log("file", req.file);
        upload_file(req.file)
          .then(file => {
            // console.log("file", file);
            req.body.file = file.url;
            // console.log("req.body", req.body);
            // event with file
            create_restaurant(req.body)
              .then(restaurant => {
                // console.log("event", restaurant);
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
        // event no file
        delete req.body.file;
        console.log("req.body with no file", req.body);
        create_event(req.body)
          .then(event => {
            res.send(event);
          })
          .catch(err => {
            res.send(err);
          });
      }
    } else {
			console.log('sorry you are not an admin and cannot create a restaurant');
			res.send('not an admin')
		}
  });
};
