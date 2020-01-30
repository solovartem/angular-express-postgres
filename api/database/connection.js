const { Pool } = require('pg');
var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123456',
    database: 'abc',
    port: '5432'
});

module.exports = pool;
