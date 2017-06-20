var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlGourmet = require('../controllers/gourmetController');
var ctrlReservoir = require('../controllers/reservoirController');
var ctrlSwitch = require('../controllers/switchController');
var ctrlMonitor = require('../controllers/monitorController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// reservoir Get
router.get('/data', ctrlReservoir.rd_data);
// Rota para Water Gauge
router.get('/data/1/latest', ctrlReservoir.rd_data_latest);
//Rotas para Cisterna
router.get('/data/1/UCSCistern10/bl10', ctrlReservoir.rd_data_C10);
//Rotas das Caixas D agua
//router.get('/data/1/UCSReserv1', ctrlReservoir.rd_data_R1);
router.get('/data/1/UCSReserv10/bl10', ctrlReservoir.rd_data_R1bl10); //Caixa D Agua Bloco 1


//Get and post para Monitoramento da Rede
router.get('/data/monitor', ctrlMonitor.rd_data_monitor); //Get arquivo JSON com resultado dos pings
router.post('/data/monitor', ctrlMonitor.wr_data_monitor); //Post arquivo JSON com resultado dos pings


// reservoir Post
router.post('/data', ctrlReservoir.wr_data);

// gourmet Get
router.get('/data1', ctrlGourmet.rd_data);
// gourmet Post
router.post('/data1', ctrlGourmet.wr_data);

// switch Get
router.get('/switchArray', ctrlSwitch.rd_SwArray);
// switch Post
router.post('/switchArray', ctrlSwitch.wr_SwArray);


module.exports = router;

