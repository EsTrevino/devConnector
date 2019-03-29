const mongoose = require('mongoose');
const config = require('../config/keys');
const localConnectionString = config.mongoURI;
const hostedConnectionString = config.hostedMongoURI;

mongoose.set('debug', true);

mongoose
  .connect(hostedConnectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log(`database successfully connected`))
  .catch(err => console.log(err.message));

module.exports.User = require('./user');
module.exports.Profile = require('./profile');
