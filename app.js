require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');

const app = express();
// (Line below) only include if you want to style handlebars pages using css and remember to add a public folder
// app.use(express.static('public')) 

// To add JS scripts in express-handlebars from view, visit https://stackoverflow.com/questions/40386257/add-scripts-in-express-handlebars-from-view
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);

// About to set up auth routers (continue from HERE!!)

app.get('/', (req, res) => {
  res.render('home');
});

// (Lines below) in case you want to use a different template in the layouts folder, add { layout: example } next to 'game
app.get('/game', (req, res) => {
  res.render('game');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});