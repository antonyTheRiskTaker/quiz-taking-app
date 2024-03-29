require('dotenv').config();
const passportFunctions = require('./passport');
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const app = express();

const port = process.env.PORT || 3000;

const isLoggedIn = require('./authFuncs/auth.js');

const AuthRouter = require('./Routers/AuthRouter');
const ViewService = require('./Services/ViewService');
const ViewRouter = require('./Routers/ViewRouter');
const authRouter = new AuthRouter();
const viewService = new ViewService()
const viewRouter = new ViewRouter(express, isLoggedIn, viewService);

// Include to style handlebars pages using css
app.use(express.static('public'));

// To add JS scripts in express-handlebars from view, visit https://stackoverflow.com/questions/40386257/add-scripts-in-express-handlebars-from-view
app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passportFunctions.initialize());
app.use(passportFunctions.session());

app.use('/', authRouter.router());
app.use('/', viewRouter.router());

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// const bcrypt = require('./passport/bcrypt.js');

// const LocalStrategy = require('passport-local').Strategy;

// Passport
// passport.use(
//   'local-login',
//   new LocalStrategy(async (email, password, done) => {
//     try {
//       let users = await knex('users').where({ email: email });
//       if (users.length == 0) {
//         return done(null, false);
//       }

//       let user = users[0];
//       // let result = await knex('users')
//       //   .where({ password: password })
//       //   .where({ email: email });
//       let result = await bcrypt.checkPassword(password, user.password);
//       if (result) {
//         return done(null, user);
//       }
//       return done(null, false);
//     } catch (err) {
//       if (err) {
//         done(err);
//       }
//     }
//   })
// );

// Need to add username as well (check https://stackoverflow.com/questions/28760101/nodejs-passport-how-to-add-more-user-information)
// passport.use(
//   'local-signup',
//   new LocalStrategy(async (email, password, done) => {
//     try {
//       let users = await knex('users').where({ email: email });
//       if (users.length > 0) {
//         return done(null, false, { message: 'Email in use' });
//       }

//       let hash = await bcrypt.hashPassword(password)
//       const newUser = {
//         email: email,
//         password: hash,
//       };

//       let userID = await knex('users').insert(newUser).returning('id');
//       newUser.id = userID;
//       done(null, newUser);
//     } catch (err) {
//       done(err);
//     }
//   })
// );

// Serialize & deserialize - border control
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// Protect your route handlers - middleware function on our routes

// function isLoggedIn(req, res, next) {
//   // console.log(req);
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// Routes
// app.get('/', (req, res) => {
//   res.render('home');
// });

// app.get('/error', (req, res) => {
//   res.render('error');
// });

// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// (Lines below) in case you want to use a different template in the layouts folder, add { layout: example } next to 'quiz'
// app.get('/quiz', isLoggedIn, (req, res) => {
//   res.render('quiz');
// });

// passport req/res
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/quiz',
//   failureRedirect: '/error'
// }));

// app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/login',
//   failureRedirect: '/error'
// }));

// app.get('/logout', (req, res, next) => {
//   req.logout(err => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('login');
//   });
// });