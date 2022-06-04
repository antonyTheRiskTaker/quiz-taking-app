const insertAnswers = (shuffledQuestions, shuffledTerms) => {
  shuffledQuestions.forEach(q => {
    // Create an empty answer array for each question object
    q.answers = [];

     // (Lines below) add the correct answer object to the answers array
     for (const term of terms) {
      if (term.id === q.answer_id) {
        q.answers.push(term);
      }
    }

    // Filter out the correct answer so three wrong answers can be randomly selected
    const filteredShuffledTerms = shuffledTerms.filter(term => term.id !== q.answer_id);

    // Continue from here!

  })
}

const formatQuestions = (questions, terms, insertAnswers) => {
  const shuffledTerms = terms.sort(() => Math.random() - .5);
  const shuffledQuestions = questions.sort(() => Math.random() - .5);
  return insertAnswers(shuffledQuestions, shuffledTerms);
}

module.exports = {
  insertAnswers: insertAnswers,
  shuffledQuestions: formatQuestions
}