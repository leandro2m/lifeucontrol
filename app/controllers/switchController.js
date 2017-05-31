var passport = require('passport');

var swArray = [
{sw1:false},
{sw2:true},
{sw3:false},
{sw4:true},
{sw5:false},
{sw6:true},
{sw7:false},
{sw8:true},
];

//respond with the switch array

module.exports.rd_SwArray = function(req, res, next) {
res.json(swArray);
};


//write to the switch array and respond w/ a copy	
	
module.exports.wr_SwArray = function(req, res, next) {
		swArray = req.body;
		res.status(200).json(swArray);

};	