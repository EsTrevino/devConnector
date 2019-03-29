const mongoose = require('mongoose');
const config = require('../config/keys');
const connectionString = config.mongoURI;

mongoose.set('debug', true);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true
  })
  .then(() => console.log('database successfully connected'))
  .catch(() => console.log('error on database connection'));

module.exports.User = require('./user');
