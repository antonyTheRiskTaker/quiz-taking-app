const express = require('express');
const isLoggedIn = require('../authFuncs/auth.js');

class ViewRouter {
  router() {
    let router = express.Router();
    router.get('/', this.getHome.bind(this));
    router.get('/login', this.getLogin.bind(this));
    router.get('/signup', this.getSignup.bind(this));
    router.get('/quiz', isLoggedIn, this.getQuiz.bind(this));
    router.get('/error', this.getError.bind(this));
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

  getQuiz(req, res) {
    res.render('quiz');
  }

  // Create dashboard

  getError(req, res) {
    res.render('error');
  }
}

module.exports = ViewRouter;