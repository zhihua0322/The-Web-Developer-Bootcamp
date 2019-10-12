var express = require("express");
var app = express();
var request = require("request");
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://zhihua:Szh19980322@cluster0-cbrmn.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex:true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.set("view engine", "ejs");
app.get("/", function(req, res){
	res.render("search");
});
app.get("/results", function(req, res){
	var query = req.query.search;
	request("http://omdbapi.com/?s=" + query + "&apikey=thewdb", function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.send("results", {data: data});
		}
	});
});

app.listen(80, function() {
	console.log("Now serving your app!");
});