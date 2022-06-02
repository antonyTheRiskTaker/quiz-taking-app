const passport = require('passport');

const loginStrategy = require('./loginStrategy.js');
const signupStrategy = require('./signupStrategy.js');

passport.use('local-login', loginStrategy);
passport.use('local-signup', signupStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;