const express = require('express');
const passportFunctions = require('../passport');

class AuthRouter {
  router() {
    let router = express.Router();

    router.post(
      '/signup',
      passportFunctions.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/error',
      })
    );

    router.post(
      '/login',
      passportFunctions.authenticate('local-login', {
        successRedirect: '/quiz',
        failureRedirect: '/error',
      })
    );

    router.get('/logout', (req, res, next) => {
      req.logout(err => {
        if (err) {
          return next(err);
        }
        res.redirect('login');
      });
    });

    return router;
  }
}

module.exports = AuthRouter;