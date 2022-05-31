const highScoresList = document.querySelector('#highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(localStorage);

highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');