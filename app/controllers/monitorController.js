var passport = require('passport');
var fs = require('fs');
var jsonfile = require('jsonfile');


// Grava resultado Ping em arquio JSON
module.exports.wr_data_monitor = function (req, res, next) {
  var clients = req.body
  var myJSON = JSON.stringify(clients)
  fs.writeFile('public/monitor.json', myJSON, function(err){
    if (err) {
      return console.log(err);
    }
    res.send("File Saved");
  })
}

module.exports.rd_data_monitor = function (req, res, next) {
  
  jsonfile.readFile('public/monitor.json', function(err,obj){
    if (err) {
      res.json({status:'error', reason: err.toString()});
      return
    }
    res.json(obj)
  })
}
