var dbconfig = module.exports = {};
//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost:27017';
config.mongo.db = 'rrAppDb';