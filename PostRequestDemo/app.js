var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];
mongoose.connect('mongodb+srv://zhihua:Szh19980322@cluster0-cbrmn.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex:true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
})

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
})

app.post("/addfriend", function(req, res){
	var newfriend = req.body.newfriend;
	friends.push(newfriend);
	res.redirect("/friends");
})
app.listen(80, function() {
	console.log("Now serving your app!");
});