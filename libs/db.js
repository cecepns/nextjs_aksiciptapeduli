const knex = require('knex')({
    client: 'mysql',
    connection: {
        // host : 'localhost', user : 'root', password : '', database : 'nextjs',
        // charset : 'utf8mb4', dateStrings: true
        host: 'aksiciptapeduli.org',
        user: 'marifat1_acp',
        password: 'b@r0k@hms',
        database: 'marifat1_acp',
        charset: 'utf8mb4',
        dateStrings: true
    }
});

export default knex