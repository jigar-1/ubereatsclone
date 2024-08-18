let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport")
let { secret } = require("./config")
const db = require('./Models/db')
const Customers = db.customers;
const Restaurants = db.restaurants;


function auth() {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };

    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const id = jwt_payload._id;
            if (jwt_payload.isCustomer) {
                Customers.findById(id, (err, results) => {
                    if (err) {
                        console.log("Error")
                        return callback(err, false);
                    }
                    if (results) {
                        console.log("Valid user")
                        callback(null, results);
                    }
                    else {
                        console.log("Invalid user")
                        callback(null, false);
                    }
                });
            }
            else {
                Restaurants.findById(id, (err, results) => {
                    if (err) {
                        console.log("Error")
                        return callback(err, false);
                    }
                    if (results) {
                        console.log("Valid user")
                        callback(null, results);
                    }
                    else {
                        console.log("Invalid user")
                        callback(null, false);
                    }
                });
            }
        })
    )
}


exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });