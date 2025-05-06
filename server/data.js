import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost', 
    database: 'perntodo',
    password: 'Ritesh222@',
    port: 5432,
})
db.connect();

export default db;
