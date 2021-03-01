exports.up = function(knex) {
    return knex.schema.createTable('muwakif', function (table) {
        table.increments();
        table.string('idcampaign');
        table.string('slug');
        table.string('nama');
        table.string('email');
        table.string('nohp');
        table.integer('jumlahdonasi');
        table.string('jenispembayaran');
        table.text('deskripsi');
        table.text('status');
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('muwakif')
};
