var config = module.exports = {};


config.env = 'development';
config.hostname = 'dev.example.com';



//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'rrAppDb';

config.mongo.options = {
  user: 'userAdmin',
  pass: 'userAdminPassword'
};