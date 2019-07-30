const db_message = require("../models/event");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("req.params", req.params);
  console.log("req.headers", req.headers);

  // go to database and find event

  db_message
    .findById(req.params.id)
    .then(event => {
      // take user from token
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log("decoded user", decoded);
        // check if user is already in the guest list
        let foundGuest = req.params.id.find;
        if (foundGuest) {
          console.log("foundGuest", foundGuest);
        } else {
          console.log("not found");
        }
      });
    })
    .catch(err => {
      console.log("err", err);
    });

  // db_message
  //   .findByIdAndUpdate(req.params.id, req.body)
  //   .then(data => {
  //     // res.send(data)
  //     // console.log('data', data);
  //     db_message
  //       .findById(data._id)
  //       .populate("author")
  //       .then(found_message => {
  //         res.send(found_message);
  //       });
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   });
};
