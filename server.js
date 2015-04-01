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
	
router.post('/', function(req, res) {
		var bear = new Bear();
		bear.name = req.body.name;
						
		bear.save(function(err) {
		if (err)
			res.send(err);
								
			res.json({ message : 'New bear created!' });
		});
	});
	
//All routes ending with /bears
router.route('/bears')
					//Create a new bear as a result of request to http://localhost:8080/api/bears
					.post(function(req, res) {

                        var bear = Bear();
 						bear.name = req.body.name;

 						bear.save(function(err) {
 							if (err)
 								res.send(err);

 							res.json({ message : 'New bear created!' });
 						});
					})
                    //Get all bears
                    .get(function(req, res) {
                        Bear.find(function(err, bears) {
                            if (err)
                                res.send(err);
                            res.json(bears);
                        });
                    });


//All routes ending with /bears/:bear_id
router.route('/bears/:bear_id')
                    .get(function(req, res){
                        Bear.findById(req.params.bear_id, function(err, bear) {
                            if (err)
                                res.send(err);
                            res.json(bear);
                        });
                    })
                    //Update a bear
                    .put(function (req, res) {
                        Bear.findById(req.params.bear_id, function(err, bear){
                            if (err)
                                res.send(err);

                            //update the bear's property
                            bear.name = req.body.name;

                            //save the bear
                            bear.save(function(err) {
                                res.send(err);
                            });

                            res.json({ message: 'Bear updated!' });
                        });
                    });

///REGISTER ROUTES
app.use('/api', router);


///START SERVER///
app.listen(port);
console.log('Magic happens on port 8080');