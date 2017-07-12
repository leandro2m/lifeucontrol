var passport = require('passport');
var mongoose = require('mongoose'); //mongo connection
var sensorData = require('../models/sensorschema');


// pega aproximadamente as ultimas 12 horas pra capturar o ultimo registro de cada reservatório

module.exports.rd_data_latest = function(req, res,next) {
          mongoose.model('Ws').find({}).sort({$natural:-1}).limit(960).exec(function (err, ws) {
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
    }
// pega todos os registros de cisterna dos ultimos 15 dias pra fazer o grafico


  
// pega toda a base de dados de reservatório, usado pra rotina de relatórios

module.exports.rd_data = function(req, res,next) {
        mongoose.model('Ws').find( {}).sort({$natural:-1}).exec(function (err, ws) {
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
    }
  
// post do registro de reservoir

module.exports.wr_data = function(req, res,next) {
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

} 


//API Cisterna Bloco 10 - Residencial Life
module.exports.rd_data_C10 = function(req, res,next) {
//app.get('/api/data/1/UCSCistern1/bl2', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid":"UCSCistern10","blocoid":"10"}).sort({$natural:-1}).exec(function (err, ws) {
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
    }


//API Caixa D Agua Bloco 10 - Residencial Life
module.exports.rd_data_R1bl10 = function(req, res,next) {  
        mongoose.model('Ws').find({"sensorid": "UCSReserv10", "blocoid": "10"}).sort({$natural:-1}).exec(function (err, ws) {
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
      }
