// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const bluebird = require("bluebird");
const mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = bluebird;

// Create Instance of Express
const app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration 
const db_conn = process.env.MONGODB_URI || "mongodb://localhost/nytSearch"
mongoose.connect(db_conn, function(error){
	if(error){
		console.error(error)
	}
	else{
		console.log("mongoose connected to " + db_conn);
	}
});


// -----------------------------------------------
// require routes
require('./routes/routes.js')(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
