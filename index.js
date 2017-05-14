var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    mongojs = require("mongojs"),
    session = require("express-session"),
    fs = require("fs");

var app = express();


var dbusername = process.env.MONGONAME;
var dbpassword = process.env.MONGOPASS;
var sessionpass = process.env.SESSIONPASS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: sessionpass,
                 cookie: {maxAge: 60000},
                 resave: true,
                 saveUninitialized: true}));

app.use(express.static(__dirname + "/public"));

var uri = "mongodb://" + dbusername + ":" + dbpassword + "@ds013366.mlab.com:13366/youcapital";
var db = mongojs(uri, ["users"]);

app.listen(process.env.PORT || 3000, function() {
  console.log("youcapital listening on port 3000.");
});

app.get("/", function(req, res) {

});
