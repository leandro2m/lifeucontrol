var passport = require('passport');
var mongoose = require('mongoose'); //mongo connection
var gourmetData = require('../models/gourmetschema');


//gourmet collection APIs

module.exports.rd_data = function(req, res,next) {
        mongoose.model('Eg').find({}, function (err, eg) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(eg);
                    }
                });
              }     
        });
    }
	
module.exports.wr_data = function(req, res,next) {
		var gD= new gourmetData();
		gD.datetime = req.body.datetime;
		gD.condoid = req.body.condoid;
		gD.blocoid = req.body.blocoid;
		gD.sensorid = req.body.sensorid;
		gD.presencecnt = req.body.presencecnt ;	
		gD.spaceid = req.body.spaceid;
		gD.tempspace = req.body.tempspace;
		gD.tempext = req.body.tempext;
		gD.humispace = req.body.humispace;
		gD.humiext = req.body.humiext;
 
		gD.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to gourmet collection'});
	});

}	