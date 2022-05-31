/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('score').defaultTo(0);
  }).then(() => {
    return knex.schema.createTable('topic', table => {
      table.increments('id').primary();
      table.string('topic_name').notNullable();
    })
  }).then(() => {
    return knex.schema.createTable('cs_term', table => {
      table.increments('id').primary();
      table.string('term').notNullable();
    })
  }).then(() => {
    return knex.schema.createTable('quiz_question', table => {
      table.increments('id').primary();
      table.string('question', 1000).notNullable();
      table.integer('topic_id').unsigned();
      table.integer('topic_id').references('topic.id');
      table.integer('answer_id').unsigned();
      table.integer('answer_id').references('cs_term.id');
    })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('quiz_question')
    .then(() => {
      return knex.schema.dropTable('cs_term');
    })
    .then(() => {
      return knex.schema.dropTable('topic');
    })
    .then(() => {
      return knex.schema.dropTable('user');
    });
};
