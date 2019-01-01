var express = require('express');
var app = express();
var port = process.env.port || 8080;

var morgan = require('morgan');
var bodyParser = require("body-parser");

var crawlerFlim = require('./execute/crawler-flim');

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain');

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.get("/", function (req, res, next) {
    res.charset = 'utf-8';
    var obj = true;
    crawlerFlim.getDataVideo('http://animetvn.tv/').then(data =>{
      res.status(200).send("data! " + data);
      next();
    }).catch(error =>{
      console.log(error);
    });
  });

  app.listen(port);
  console.log(`Listen on port ${port}`);
  exports = module.exports = app;
