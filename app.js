const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/game', (req, res) => {
  res.render('game');
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});