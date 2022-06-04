class ViewService {
  constructor(knex) {
    this.knex = knex;
  }

  async getQuiz() {
    const terms = await knex.select('*').from(TERM_TABLE_NAME);
    const questions = await knex.select('*').from(QUESTION_TABLE_NAME);

  }
}