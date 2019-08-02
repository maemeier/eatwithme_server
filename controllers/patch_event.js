const db_event = require("../models/event");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log("req.params", req.params);

  console.log("req.headers", req.headers);

  // go to database and find event

  db_event
    .findById(req.params.id)
    .then(event => {
      // take user from token
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log("decoded user", decoded);

        // check if user is already in the guest list
        if (req.body.attend) {
          let foundGuest = event.guests.find(g => g == decoded._id);
          if (foundGuest) {
            console.log("foundGuest", foundGuest);

            res.send(event);
          } else {
            event.guests.push(decoded._id);
            db_event
              .findByIdAndUpdate(event._id, event, { new: true })
              .then(newEvent => {
                res.send(newEvent);
              });
          }
        } else {
          db_event
            .findByIdAndUpdate(event._id, req.body, { new: true })
            .then(newEvent => {
              res.send(newEvent);
            });
        }
      });
    })
    .catch(err => {
      console.log("err", err);
    });
};
