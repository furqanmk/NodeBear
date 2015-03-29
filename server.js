///BASE SETUP///
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://grunfunke:FiveFour00147@proximus.modulusmongo.net:27017/hutovi3T');

var Bear       = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

///SETTING UP ROUTES///
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Something is happening!');
	next();
});

//test route to make sure that the api is working
router.get('/', function(req, res) {
		res.json({ message: "hooray! Welcome to our server!" });
	});

///REGISTER ROUTES
app.use('/api', router);


///START SERVER///
app.listen(port);
console.log('Magic happens on port 8080');