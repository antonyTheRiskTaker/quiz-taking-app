const development = require('../knexfile').development;
const knex = require('knex')(development);
const { insertAnswers, formatQuestions } = require('../viewFuncs/formatQuestions');

const TERM_TABLE_NAME = 'cs_term';
const QUESTION_TABLE_NAME = 'quiz_question';
const USER_TABLE_NAME = 'users';

class ViewService {

  async getQuiz() {
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
}

module.exports = ViewService;