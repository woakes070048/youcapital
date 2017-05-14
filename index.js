require('dotenv').config();

var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    mongojs = require("mongojs"),
    session = require("express-session"),
    fs = require("fs");

const pug = require("pug");

var dbUsername = process.env.MONGONAME;
var dbPassword = process.env.MONGOPASS;
var sessionPass = process.env.SESSIONPASS;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: sessionPass,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'pug');

var uri = "mongodb://" + dbUsername + ":" + dbPassword + "@ds013366.mlab.com:13366/youcapital";
var db = mongojs(uri, ["users"]);

app.listen(process.env.PORT || 3000, function() {
  console.log("youcapital listening on port 3000.");
});

app.get("/", function(req, res) {
 
  var name = "Jesse";
  
  res.render("template.pug", {
    name: name
  });

});
