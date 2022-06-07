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
    router.get('/error', this.getError.bind(this));
    router.get('/dashboard', this.isLoggedIn, this.getDashboard.bind(this));
    router.get('/quiz', this.isLoggedIn, this.getQuiz.bind(this));
    router.get('/quizdata', this.isLoggedIn, this.getQuizData.bind(this));
    router.post('/userscore', this.isLoggedIn, this.updateUserScore.bind(this));
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
    res.render('quiz', { layout: 'quizfront' });
  }

  getQuizData(req, res) {
    try {
      return this.viewService.getQuizData()
        .then(questions => res.json(questions));
    } catch (error) {
      console.log(error);
    }
  }

  getDashboard(req, res) {
    try {
      return this.viewService.getDashboard(req.user)
        .then(userInfo => {
          // userInfo is an array containing info of a single logged-in user, therefore: userInfo[0]
          res.render('dashboard', { userInfo: userInfo[0] });
        });
    } catch (error) {
      console.log(error);
    }
  }

  getError(req, res) {
    res.render('error');
  }

  updateUserScore(req, res) {
    // const userInfo = req.user;
    // const userSession = req.session.passport.user;
    // console.log('User info from req.user:', userInfo);
    // console.log('User info from req.session:', userSession);
    const userId = req.user.id;
    const currentScore = req.user.score;
    const quizScore = req.body.finalScore;
    return this.viewService
      .updateUserScore(userId, currentScore, quizScore)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = ViewRouter;