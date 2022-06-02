/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('quiz_question').del()
  await knex('cs_term').del()
  await knex('topic').del()
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'loidforger@gmail.com', password: 'OpEr@TiOnStRyX', score: 0}
  ])
  await knex('topic').insert([
    {id: 1, topic_name: 'computer science'}
  ])
  await knex('cs_term').insert([
    {id: 1, term: 'Turing Machine'},
    {id: 2, term: 'CPU'},
    {id: 3, term: 'Transitors'},
    {id: 4, term: 'Bit'},
    {id: 5, term: 'Byte'},
    {id: 6, term: 'ASCII Character Encoding'},
    {id: 7, term: 'Binary'},
    {id: 8, term: 'Hexadecimal'},
    {id: 9, term: 'Nibble'},
    {id: 10, term: 'Machine Code'},
  ])
  await knex('quiz_question').insert([
    {id: 1, question: 'This is a piece of tape that holds ones and zeros, along with a device that can read and write to it. In theory, it can be used to implement any computer algorithm. What is it called?', topic_id: 1, answer_id: 1},
    {id: 2, question: 'What is the name for the part of a modern computer that executes instructions comprising a computer programme?', topic_id: 1, answer_id: 2},
    {id: 3, question: 'What do you call the semiconductor device used to amplify or switch electrical signals and power, which is also the basic component of a CPU?', topic_id: 1, answer_id: 3},
    {id: 4, question: 'What is the smallest piece of information a computer can use?', topic_id: 1, answer_id: 4},
    {id: 5, question: 'What is the unit of 8 bits of information?', topic_id: 1, answer_id: 5},
    {id: 6, question: 'What is the character encoding standard for electronic communication that supports characters such as those on a computer keyboard?', topic_id: 1, answer_id: 6},
    {id: 7, question: 'What is the counting system that only has one and zero called?', topic_id: 1, answer_id: 7},
    {id: 8, question: 'This is a counting system that consists of 0 to 9 and letters "a" to "f". What is called?', topic_id: 1, answer_id: 8},
    {id: 9, question: 'What is the name of a four-bit group, also known as half-byte?', topic_id: 1, answer_id: 9},
    {id: 10, question: 'What is the code in binary format that is converted from a human-readable programming language, that can be decoded and executed by the CPU?', topic_id: 1, answer_id: 10},
  ])
};
