class ViewRouter {
  constructor(express, isLoggedIn, viewService) {
    this.express = express;
    this.isLoggedIn = isLoggedIn;
    this.viewService = viewService;
  }

  router() {
    let router = this.express.Router();
    router.get('/', this.getHome.bind(this));
    router.get('/login', this.getLogin.bind(this));
    router.get('/signup', this.getSignup.bind(this));
    router.get('/quiz', this.isLoggedIn, this.getQuiz.bind(this));
    router.get('/dashboard', this.isLoggedIn, this.getDashboard.bind(this));
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
    try {
      return this.viewService.getQuiz()
        .then(questions => {
          // for (const question of questions) {
          //   console.log(question);
          // }
          res.render('quiz', { questionData: questions });
        });
    } catch (error) {
      console.log(error);
    }
  }

  getDashboard(req, res) {
    res.render('dashboard');
  }

  getError(req, res) {
    res.render('error');
  }
}

module.exports = ViewRouter;