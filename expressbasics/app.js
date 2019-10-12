var express = require("express")
var app = express()
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zhihua:Szh19980322@cluster0-cbrmn.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex:true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
app.get("/", function(req, res){
	res.send("Hi there");
});
app.get("/speak/:animal", function(req, res){
	var sounds = {
		pig: "Olink",
		cow: "Moo",
		dog: "Woof Woof"
	}
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
		res.send("The" + animal + "says" + sound + "'");
});
app.listen(80, function() {
	console.log("Now serving your app!");
});