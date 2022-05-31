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
  }).then(() => {
    return knex.schema.createTable('score', table => {
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('user_score').defaultTo(0);
    })
  }).then(() => {})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
