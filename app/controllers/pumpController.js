var passport = require('passport');
var mongoose = require('mongoose'); //mongo connection
var pumpData = require('../models/pumpschema');


//gourmet collection APIs

module.exports.rd_data = function(req, res,next) {
        mongoose.model('Wp').find({}, function (err, wp) {
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
		var pump = new pumpData();
		pump.datetime = req.body.datetime;
		pump.condoid = req.body.condoid;
		pump.blocoid = req.body.blocoid;
		pump.pump = req.body.pump;
		pump.status = req.body.status;
 
		pump.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to pump collection'});
	});

}