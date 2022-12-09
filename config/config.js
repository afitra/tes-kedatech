require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "dialect": process.env.DB_DIALECT,
},
"test": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "dialect": process.env.DB_DIALECT,
},
"production": {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DBNAME,
    "host": process.env.PG_HOST,
    "dialect": process.env.DB_DIALECT,
}
};