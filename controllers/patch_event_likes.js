const db_event = require("../models/event");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
	console.log('gggg',req.body);
  // go to database and find event

  db_event.findById(req.params.id).then(event => {
		console.log('event', event)
      // take user from token
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (decoded) {
					console.log('decoded');
					db_event.findByIdAndUpdate(req.params.id, req.body).then((data) =>{
	console.log('sata', data);
})
}

})
    })
    .catch(err => {
      console.log("err", err);
    });
};
