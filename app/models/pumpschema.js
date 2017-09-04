// Load required packages
var mongoose = require('mongoose');

// Define o schema do espaço Gourmet
var PumpSchema   = new mongoose.Schema({
    datetime: String,
    condoid: Number,
    blocoid: Number,
	pump: String,
	status: Number,
	actuation: Number
},
{collection : 'waterPump'}
);

// Export the Mongoose model
module.exports = mongoose.model('Wp', PumpSchema);