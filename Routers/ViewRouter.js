const express = require('express');
const development = require('../knexfile').development;
const knex = require('knex')(development);
const TERM_TABLE_NAME = 'cs_term';
const QUESTION_TABLE_NAME = 'quiz_question';
const isLoggedIn = require('../authFuncs/auth.js');

class ViewRouter {
  router() {
    let router = express.Router();
    router.get('/', this.getHome.bind(this));
    router.get('/login', this.getLogin.bind(this));
    router.get('/signup', this.getSignup.bind(this));
    router.get('/quiz', isLoggedIn, this.getQuiz.bind(this));
    router.get('/dashboard', isLoggedIn, this.getDashboard.bind(this));
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

  async getQuiz(req, res) {
    try {
      const terms = await knex.select('*').from(TERM_TABLE_NAME);
      const questions = await knex.select('*').from(QUESTION_TABLE_NAME);
      const shuffledQuestions = questions.sort(() => Math.random() - .5);
      const questionsWithOptions = shuffledQuestions.forEach(q => {});
      console.log(terms);
      console.log(shuffledQuestions);
    } catch (error) {
      console.log(error);
    }
    res.render('quiz');
  }

  getDashboard(req, res) {
    res.render('dashboard');
  }

  getError(req, res) {
    res.render('error');
  }
}

module.exports = ViewRouter;