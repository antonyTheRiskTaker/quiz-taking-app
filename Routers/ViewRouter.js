const express = require('express');
const isLoggedIn = require('../authFuncs/auth.js').isLoggedIn;

class ViewRouter {
  router() {
    let router = express.Router();
    router.get('/', this.getHome.bind(this));
    router.get('/login', this.getLogin.bind(this));
    router.get('/signup', this.getSignup.bind(this));
    router.get('/quiz')
    return router;
  }

  getHome(req, res) {
    res.render('home');
  }

  getLogin(req, res) {
    res.render('login');
  }

  getSignup(req, res) {
    res.render('signup');
  }
}

module.exports = ViewRouter;