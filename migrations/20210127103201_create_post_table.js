
exports.up = function(knex) {
  return knex.schema.createTable('posts', function (table) {
      table.increments();
      table.string('image');
      table.string('title');
      table.text('content');
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
