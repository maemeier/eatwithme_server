const db_event = require("../models/event");
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
		console.log("uplode file", file);
    let uri = create_uri(file).content;
		console.log("uri" , uri);
    cloudinary.uploader
      .upload(uri)
      .then((saved) => {
        console.log("saved", saved);
        resolve(saved);
      })
      .catch(err => {
        console.log("err upload file", err);
        reject(err);
      });
  });
};

const create_event = body => {
  return new Promise(function(resolve, reject) {
		console.log('~~~~ body', body);
    db_event
      .create(body)
      .then(data => {
        console.log("data", data);
        db_event
          .findById(data._id)
          .populate({
            path: "author",
            select: "name email"
          })
          .then(event => {
						console.log("then event", event);
            resolve(event);
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
	console.log('>>>>> CREATING EVENT');
  let token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "fyni", (err, decoded) => {
    if (decoded) {
      console.log("decoded", decoded);
      req.body.author = decoded._id;
			console.log("req body author", req.body.author);
      req.body.guests = [];
			console.log("req body guests", req.body.guests);
      req.body.guests.push(decoded._id);
			console.log("req body guests ", req.body.guests);
      // file
      if (req.file && req.file != null) {
        console.log("file", req.file);
        upload_file(req.file)
          .then(file => {
            console.log("file", file);
            req.body.file = file.url;
            console.log("req.body", req.body);
            // event with file
            create_event(req.body)
              .then(event => {
                console.log("event", event);
                res.send(event);
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
    }
  });
};
