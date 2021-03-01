exports.up = function(knex) {
    return knex.schema.createTable('campaign', function (table) {
        table.increments();
        table.string('image');
        table.string('judul');
        table.string('fundraiser');
        table.string('slug');
        table.text('deskripsi');
        table.integer('target');
        table.integer('terkumpul');
        table.datetime('daritanggal');
        table.datetime('sampaitanggal');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('campaign')
};
