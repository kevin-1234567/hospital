const mongoose = require('mongoose');
const { connect, connection } = mongoose;
require('dotenv').config();
console.log('>>>>>>>>>>', process.env.DB_URL);
connect(process.env.DB_URL);
connection.on('connected', () => console.log('DB connected successfully'));
connection.on('error', (err) => console.log('Error occurred', err));
module.exports = connection;
