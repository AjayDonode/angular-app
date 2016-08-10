
var config = require('../config/config.global');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dbURI = 'mongodb://'+config.mongo.uri+'/'+config.mongo.db;

//var dbURI = 'mongodb://rruser:rruserPassword@dgphxgtddb002.phx.gapinc.dev/rapidreport';
mongoose.connect(dbURI,function(err) {
    if (err){console.log("Error "+err); throw err;} else
    console.log("Successfully connected to MongoDB");
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

var User = mongoose.model('User', new Schema({
  name: { type: String },
  lastname: { type: String },
  email: { type: String, unique: true, lowercase: true, trim: true, index: true, sparse: true},
  password: { type: String, select: false },
  sex: { type: String },
  role: { id: Number,role: String },
  created_at: {type:Date},
  updated_at: {type:Date}
}));

var RapidTest = mongoose.model('RapidTest', new Schema({
  name: { type: String },
  owner: { type: String },
  approver: { type: String },
  brand: { type: String },
  market: { type: String },  
  division: { type: String }, 
  category: { type: String }, 
  department:{ type: String }, 
  impact_seasons:{ type: String }, 
  class:{ type: String }, 
  type: { type: String },
  details: { type: String },
  output:{ type: String }, 
  secoutput:{ type: String },
  objective:{ type: String }, //TODO check single or multi value
  backupplan:{type: String},
  readoutput:{type: String},
  retailinitialseason:{type: String},
  retaillife:{type: String},
  stylecount:{ type: Number },
  cc_count: { type: Number }, 
  retailvalue:{ type: String },
  bizimpact:{ type: String },
  tooweeks:{ type: Number },
  testweeks:{ type: Number },
  too_start_dt: {type:Date},
  impactflow: { type: String },
  offerflowmonth: { type: String },
  startdate: {type:Date},
  resultdate: {type:Date},
  status: {type: String },
  created_by: {type:String},
  created_at: {type:Date},
  updated_at: {type:Date},
  keydates:{ kickoff :{type:Date} }
}));

 
                

//module.exports = User;
module.exports = {
  User: User,
  RapidTest: RapidTest
};