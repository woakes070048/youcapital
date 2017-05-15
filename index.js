require('dotenv').config();

var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    mongojs = require("mongojs"),
    session = require("express-session"),
    fs = require("fs"),
    hash = require("password-hash");

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
  var sess = req.session;
  res.render("landing.pug", {
    subtitle: "Hiring with intent!",
    name: sess.name
  });
});

app.get("/register", function(req, res) {
  res.render("register.pug", {
    subtitle: "Register"  
  });
});

app.post("/register", function(req, res) {
  var sess = req.session;
  var userObj = req.body;
  userObj.password = hash.generate(req.body.password)
  db.users.insert(userObj, function(err, doc) {
    if(err)
      console.log("Error inserting new user: " + err);
    else {
      sess.name = userObj.firstname + " " + userObj.lastname;
      res.redirect("/");
    }
  });
});
