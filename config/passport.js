const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./keys');
const db = require('../models');
const User = db.User;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.jwtSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          console.log('error from passport config auth middleware ', err);
          return done(err, null);
        });
    })
  );
};
