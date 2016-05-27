// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// Integrate body-parser with our App
app.use(bodyParser.json());

// Require path
var path = require("path");
var mongoose = require('mongoose');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect CSS bootstrap
app.use('/ui', express.static(__dirname + '/node_modules/angular-ui-bootstrap/dist')); // redirect ui bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/fonts')); // redirect ui bootstrap


// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, "./client")));
require('./server/config/mongoose.js')
var routes_setter = require('./server/config/routes.js');
routes_setter(app);




// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
