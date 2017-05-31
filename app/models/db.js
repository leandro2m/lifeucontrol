 //mongoose.connect( 'mongodb://lfilipe.email:mlab123@ds139949.mlab.com:39949/mlabsensordb', function () {
 //mongoose.connect('mongodb://localhost/sensordb', function () {  
 //console.log('mongodb connected to mLab: ds139949.mlab.com:39949/mlabsensordb')
 //console.log('mongodb connected to local mongodb')

var mongoose = require('mongoose');
var gracefulShutdown;
//var dbURI = 'mongodb://localhost/sensordb';
var dbURI = 'mongodb://lifeucontrol:Pswd123$@ds157971.mlab.com:57971/lifeucontrol';  //DB para Condominio Life
//var dbURI = 'mongodb://lfilipes:mlab123@ds137801.mlab.com:37801/mlab-sensordb';  //DB para Testes
//if (process.env.NODE_ENV === 'production') {
//  dbURI = process.env.MONGOLAB_URI;
//}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

module.exports = mongoose
