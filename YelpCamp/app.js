var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

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
	res.render("landing");
});
var campgrounds = [
           {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
           {name: "Granite Hill", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
           {name: "Sunset Beach Rest", image: "http://photosforclass.com/download/14435096036"}
       ]; 

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});
app.post("/campgrounds", function (req, res){
    // get data from form and add to campgrounds array
    var name= req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds"); //default of redirecting is a GET request
});

app.get("/campgrounds/new", function (req, res){
   res.render("new.ejs") 
});

app.listen(80, function() {
	console.log("YelpCamp has started!");
});