const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

//Route Declaration
require('./routes/transactions.route')(app);