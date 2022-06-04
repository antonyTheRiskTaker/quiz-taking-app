const development = require('../knexfile').development;
const knex = require('knex')(development);
const { insertAnswers, formatQuestions } = require('../viewFuncs/formatQuestions');

const TERM_TABLE_NAME = 'cs_term';
const QUESTION_TABLE_NAME = 'quiz_question';

class ViewService {

  async getQuiz() {
    const terms = await knex.select('*').from(TERM_TABLE_NAME);
    const questions = await knex.select('*').from(QUESTION_TABLE_NAME);
    return formatQuestions(questions, terms, insertAnswers);
  }
}

module.exports = ViewService;