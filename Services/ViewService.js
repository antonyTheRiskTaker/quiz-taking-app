const development = require('../knexfile').development;
const knex = require('knex')(development);
const { insertAnswers, formatQuestions } = require('../viewFuncs/formatQuestions');

const TERM_TABLE_NAME = 'cs_term';
const QUESTION_TABLE_NAME = 'quiz_question';
const USER_TABLE_NAME = 'users';

class ViewService {

  async getQuizData() {
    const terms = await knex.select('*').from(TERM_TABLE_NAME);
    const questions = await knex.select('*').from(QUESTION_TABLE_NAME);
    return formatQuestions(questions, terms, insertAnswers);
  }

  async getDashboard(user) {
    const userInfo = await knex(USER_TABLE_NAME)
      .select('*')
      .where({ id: user.id });
    return userInfo;
  }

  async updateUserScore(userId, currentScore, quizScore) {
    // (Lines below) first, get the current score from the user and return it.
    const newScore = currentScore + quizScore;
    const updated = await knex(USER_TABLE_NAME)
      .update({ score: newScore })
      .where({ id: userId })
      .returning('*');
    return updated;
  }
}

module.exports = ViewService;