/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();

/* Serving static files in express */
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


/* Main Page for Slide Master */
app.get('/SlideMaster', function(req,res){
    /* Sends the slidemaster html page to the user */
    fs.readFile('slidemaster.html', 'utf8', function(err, data){
        if(!err) res.send(data);
        else return console.log(err);
    });
});


/* Listens on the cloud9 Port */
app.listen(process.env.PORT, function() {
  console.log('App listening at http://%s:%s', process.env.IP, process.env.PORT);
});