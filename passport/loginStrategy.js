const development = require('../knexfile').development;
const hashFunction = require('./bcrypt');
const knex = require('knex')(development);
const TABLE_NAME = 'users';
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(async (email, password, done) => {
  try {
    let users = await knex(TABLE_NAME).where({ email: email });
    if (users.length == 0) {
      return done(null, false);
    }

    let user = users[0];
    let result = await hashFunction.checkPassword(password, user.password);
    if (result) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    if (err) {
      done(err);
    }
  }
})