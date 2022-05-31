/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.integer('score').defaultTo(0);
  }).then(() => {
    return knex.schema.createTable('cs_term', table => {
      table.increments('id').primary();
      table.string('term').notNullable();
    })
  }).then(() => {
    // return knex.schema.createTable('', table => {})
  }).then(() => {
    return knex.schema.createTable('cs_question', table => {
      table.increments('id').primary();
      table.string('question', 1000).notNullable();
      table.integer('answer_id')
    })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
