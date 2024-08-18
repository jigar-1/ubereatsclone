const dbConfig = require("../config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.customers = require("./CustomerModel")(mongoose);
db.restaurants = require("./RestaurantModel")(mongoose);
db.orders = require("./OrderModel")(mongoose);


module.exports = db;

// const mysql = require('mysql');
// const constants = require('../config.json');

// const db = mysql.createPool({
//     connectionLimit: 500,
//     host: constants.DB.host,
//     port: constants.DB.port,
//     user: constants.DB.username,
//     password: constants.DB.password,
//     database: constants.DB.database,
//     multipleStatements: true
// })


// db.getConnection((err) => {
//     if (err)
//         console.log(err)
//     else
//         console.log("Connected to database...")
// })

// module.exports = db