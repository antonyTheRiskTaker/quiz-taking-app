const express = require('express');
const passportFunctions = require('../passport');

class AuthRouter {
  router() {
    let router = express.Router();

    router.post('/signup', passportFunctions.authenticate());

    router.post('/signup', );
  }


}

module.exports = AuthRouter;