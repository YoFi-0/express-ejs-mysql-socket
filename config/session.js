const sessionLib = require('express-session');
const MySQLStore = require('express-mysql-session')(sessionLib);

const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_POST,
    createDatabaseTable: true,
})

const session = sessionLib({
    secret: process.env.SESSION_KEY,
    resave:false,
    saveUninitialized: false,
    name: 'iwdgowdi',
    store: sessionStore,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure:false
      }
})

module.exports = session