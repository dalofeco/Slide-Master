/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var queryString = require("querystring");
var bodyParser = require("body-parser");
var store = require('json-fs-store')('./lectureData'); /* Creates a directory called lectureData */
var lectureContent = fs.readFileSync('resources/lecture.json');
var lectureObj = JSON.parse(lectureContent);

/* Serving static files in express */
app.use('startbootstrap-agency/css', express.static('css'));
app.use('/startbootstrap-agency/js', express.static('js'));
app.use('/startbootstrap-agency/font-awesome', express.static('font-awesome'));
app.use('/startbootstrap-agency/fonts', express.static('fonts'));
app.use('/startbootstrap-agency/less', express.static('less'));
app.use('/startbootstrap-agency/img', express.static('img'));
app.use('/startbootstrap-agency/mail', express.static('mail'));

app.use('/resources', express.static('resources'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

console.log("This file is running!");
var lecture = {
    id: "lectureData",
    data: lectureObj
};

/* Adds the lecture Object to the store */
store.add(lecture, function(err) {
    if (err) console.log(err); // err if the save failed
});

/* Main Page for Slide Master */
app.get('/SlideMaster', function(req, res) {

    /* Sends the slidemaster html page to the user */
    fs.readFile('startbootstrap-agency/index.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

/* Sends the slide.html template */
app.get('/SlideMaster/slide', function(req, res) {
    fs.readFile('templates/slide.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

/* Returns the lecture content to the client */
app.get('/loadLecture', function(req, res) {
    // res.send(lecture);
    store.load('lectureData', function(err, lecture) {
        if (err) console.log(err); // err if JSON parsing failed
        res.send(lecture.data);
    });
});

/* Saves the lecture object */
app.post('/saveNote', function(req, res) {
    /* Removing the previous lecture data */
    store.remove('lectureData', function(err) {
        if (err) console.log(err); // err if the file removal failed 
    });
    
    /* Creating a new lecture object for the data store */
    var lecture = {
        id: "lectureData",
        data: req.body
    };

    /* Adding the new lecture data to the store */
    store.add(lecture, function(err) {
        if (err) console.log(err); // err if the save failed
    });

    // console.log(newLecObj);
    res.send("Saved Successfully!");
});

/* Insert Nodes Iframe URL Handler */
app.get('/resources/noteInterface', function(req, res) {
    fs.readFile('resources/noteInterface.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else console.log(err);
    });
});

/* Display Nodes Iframe URL Handler */
app.get('/resources/noteDisplay', function(req, res) {
    fs.readFile('resources/noteDisplay.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else console.log(err);
    });
});

/* Listens on the cloud9 Port */
app.listen(process.env.PORT, function() {
    console.log('App listening at https://slide-master-abdallahozaifa.c9users.io/SlideMaster');
});
