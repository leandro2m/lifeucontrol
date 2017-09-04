var passport = require('passport');
var mongoose = require('mongoose'); //mongo connection
var pumpData = require('../models/pumpschema');


//gourmet collection APIs

module.exports.rd_data = function(req, res,next) {
        mongoose.model('Wp').find({}).sort({$natural: -1}).limit(100).exec(function (err, wp) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(wp);
                    }
                });
              }     
        });
    }
	
module.exports.wr_data = function(req, res,next) {
		var waterpump = new pumpData();
		waterpump.datetime = req.body.datetime;
		waterpump.condoid = req.body.condoid;
		waterpump.blocoid = req.body.blocoid;
		waterpump.pump = req.body.pump;
		waterpump.status = req.body.status;
    waterpump.actuation = req.body.actuation;
 
		waterpump.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to pump collection'});
	});

}