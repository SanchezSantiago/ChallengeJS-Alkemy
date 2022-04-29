
module.exports = { //here is the necessary authentication information so that the base can work
    database: {
        host: 'localhost',
        user: 'root',
        password: process.env.SQLPASS,
        database: 'personalbudget'
    }
}