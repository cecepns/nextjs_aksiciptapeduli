// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'nextjs',
            charset: 'utf8mb4',
            dateStrings: true,
            // host: 'aksiciptapeduli.org',
            // user: 'marifat1_acp',
            // password: 'b@r0k@hms',
            // database: 'marifat1_acp',
            // charset: 'utf8mb4',
            // dateStrings: true,
        }
    },
    production: {
        client: 'mysql',
        connection: {
            // host: 'aksiciptapeduli.org',
            user: 'marifat1_acp',
            password: 'b@r0k@hms',
            database: 'marifat1_acp',
            charset: 'utf8mb4',
            dateStrings: true
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
