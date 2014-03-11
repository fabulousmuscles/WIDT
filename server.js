var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port     = process.env.PORT || 8000;

var database = require('./config/db');
mongoose.connect(database.url);
  
app.configure(function() {     
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

require('./app/routes.js')(app);

app.listen(port, "127.0.0.1", function() {
    console.log("Listening on port " + port);
});
