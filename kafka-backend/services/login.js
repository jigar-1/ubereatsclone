const db = require("../Models/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Customer = db.customers;
const Restaurant = db.restaurants;
const { secret } = require('../config');
const { auth } = require('../passport')
auth();
const { isNull } = require('lodash');

const login = async (msg, callback) => {
    let res = {};

    console.log("kafka-backend login, MSG", msg)

    console.log("Inside Login Post Request");
    console.log("Req Body : ", msg);

    const email = msg.email;
    const password = msg.password;
    const isCustomer = msg.isCustomer;

    const user = await Customer.findOne({ email })
    const restaurant = await Restaurant.findOne({ email })

    console.log("USER", user)
    console.log("RESTAURANT", restaurant)

    if ((isNull(user) && isCustomer) || (isNull(restaurant) && !isCustomer)) {
        res.auth = false;
        res.status = 500;
        res.message = "No Such User";
        callback(null, res)
        // res.send({ auth: false, message: "No Such User" })
    }

    else {
        if (isCustomer) {
            if (await bcrypt.compareSync(password, user.password)) {
                const payload = { _id: user._id, email: user.email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000
                });
                res.auth = true;
                res.status = 200;
                res.jwt = token;
                res.customer = user;
                callback(null, res);
                // res.send({ auth: true, jwt: token, customer: user })
            }
            else {
                res.auth = false;
                res.status = 500;
                res.message = "Invalid Credentials";
                callback(null, res);
                // res.customer=user;
                // res.send({ auth: false, message: "Invalid Credentials!" })
            }
        }
        else {
            console.log("here")
            if (await bcrypt.compareSync(password, restaurant.password)) {
                const payload = { _id: restaurant._id, isCustomer, email: restaurant.email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000
                });
                res.auth = true;
                res.status = 200;
                res.jwt = token;
                res.restaurant = restaurant;
                callback(null, res);
                // res.send({ auth: true, jwt: token, restaurant: restaurant })
            }
            else {
                res.auth = false;
                res.status = 500;
                res.message = "Invalid Credentials";
                callback(null, res);
                // res.send({ auth: false, message: "Invalid Credentials!" })
            }
        }
    }

};




function handle_request(msg, callback) {

    console.log("Inside login kafka backend");

    if (msg.path === "login")
        login(msg, callback);

    console.log("handle req, MSG", msg);
    console.log("msg path:", msg.path);


}




exports.handle_request = handle_request;

