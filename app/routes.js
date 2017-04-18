var mongoose = require('mongoose'); //mongo connection
var sensorData = require('./models/sensorschema');
var gourmetData = require('./models/gourmetschema');
var fs = require('fs');
var jsonfile = require('jsonfile');

module.exports = function(app) {

//sensor collection APIs

app.get('/api/data', function(req, res, next) {
        mongoose.model('Ws').find({}, function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    })
	
app.post('/api/data', function (req, res, next) {
		var sD= new sensorData();
		sD.datetime = req.body.datetime;
		sD.condoid = req.body.condoid;
		sD.blocoid = req.body.blocoid;
		sD.sensorid = req.body.sensorid ;
		sD.poleid = req.body.poleid ;
		sD.level1 = req.body.level1 ;
		sD.level2 = req.body.level2;
		sD.level3 = req.body.level3;
		sD.level4 = req.body.level4;
		sD.temp = req.body.temp;
		sD.humi = req.body.humi;
 
		sD.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to reservoir collection'});
	})

})	
	
//gourmet collection APIs

app.get('/api/data1', function(req, res, next) {
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
    })
	
app.post('/api/data1', function (req, res, next) {
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
	})

})		

app.get('/api/data/1/UCSCistern10', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid": "UCSCistern10"}, {}, { sort: { "datetime": -1}, limit: 10 }, function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    })

// Post para status dos devices

app.post('/api/monitor', function (req, res) {
    var clients = req.body
  
    filePath = "public/monitor.json";

    fs.writeFile(filePath, JSON.stringify(clients), function(err){
      if (err) {
        return console.log(err);
      }
      res.send("File saved");
    })
  })  

app.get('/api/monitor', function (req, res) {
  
  jsonfile.readFile('public/monitor.json', function(err,obj){
    if (err) {
      res.json({status:'error', reason: err.toString()});
      return
    }
    res.json(obj)
  }
)


})


}
