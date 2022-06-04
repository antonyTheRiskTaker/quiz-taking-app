const insertAnswers = (shuffledQuestions, shuffledTerms) => {

  shuffledQuestions.forEach(q => {
    // Create an empty answer array for each question object
    q.answers = [];

    // Add the correct answer object to the answers array
    for (const term of shuffledTerms) {
      if (term.id === q.answer_id) {
        q.answers.push(term);
      }
    }

    // Filter out the correct answer from the original shuffled term array
    const filteredShuffledTerms = shuffledTerms.filter(term => term.id !== q.answer_id);

    // Push the first three of the filtered shuffled term array
    for (let i = 0; i < 3; i++) {
      q.answers.push(filteredShuffledTerms[i]);
    }

    // Since the answer array starts with the correct answer option, we need to apply the sort method to shuffle the answer array
    q.answers.sort(() => Math.random() - .5);
  });

  return shuffledQuestions;
};

const formatQuestions = (questions, terms, insertAnswers) => {
  const shuffledTerms = terms.sort(() => Math.random() - .5);
  const shuffledQuestions = questions.sort(() => Math.random() - .5);
  return insertAnswers(shuffledQuestions, shuffledTerms);
};

module.exports = {
  insertAnswers: insertAnswers,
  formatQuestions: formatQuestions
};