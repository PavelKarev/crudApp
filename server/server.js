// Express
let express = require('express');
let app = express();
const path = require('path');
const map = require('./mapRoute');
const settings = require('./settings.js');

// Add headers

if (process.env.NODE_ENV !== 'production') {
  app.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
      // Pass to next layer of middleware
      next();
  });
}

// Static Folder
app.use(express.static(__dirname + './../public/dist'));

// Body Parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Morgan (debugger)
let morgan = require('morgan');
app.use(morgan('dev'));

// Mongo Database
let mongoose = require('mongoose');
mongoose.connect(settings.MONGO);

var prefixes = ['users'];

// map route to object controller
prefixes.forEach((prefix) => {
  map.mapRoute(app, prefix);
});

// Routes
if (process.env.NODE_ENV === 'production') {
  app.all("*", (req, res, next) => {
      res.sendFile(path.resolve("../public/dist/index.html"));
  });
}

// Server listening
app.listen(3000, () => console.log('Server running at 3000'));