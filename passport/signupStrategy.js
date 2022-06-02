const development = require('../knexfile').development;
const hashFunction = require('./bcrypt');
const knex = require('knex')(development);
const TABLE_NAME = 'users';
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(async (email, password, done) => {
  console.log('signing up');
  console.log('Email', email);
  console.log('Password', password);

  try {
    // Get the user
    let users = await knex(TABLE_NAME).where({ email: email });

    // If there is a user
    if (users.length > 0) {
      return done(null, false, { message: 'User already exists' });
    }

    // Otherwise, hash their password
    let hashedPassword = await hashFunction.hashPassword(password)

    // Get the new user
    const newUser = {
      email: email,
      password: hashedPassword,
    };

    // Insert the new user, get the id
    let userId = await knex(TABLE_NAME).insert(newUser).returning('id');
    newUser.id = userId[0];
    console.log('New user:', newUser);

    // done - pass back the user object
    done(null, newUser);
  } catch (error) {
    done(error);
  }
});