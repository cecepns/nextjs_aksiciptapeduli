
exports.up = function(knex) {
    return knex.schema.createTable('artikel', function (table) {
        table.increments();
        table.string('image');
        table.string('judul');
        table.string('slug');
        table.string('deskripsi');
        table.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('artikel')
  };
  