const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

// (Line below) re-enable the save button
username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
});

saveHighScore = e => {
  // (Line below) to make sure the page won't refresh once save button pressed
  e.preventDefault();
  
  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  // (Line below) remove the 6th element and what come after from the array
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('./index.html');
}