const db = require("../models/db");
const Restaurant = db.restaurants;
const bcrypt = require('bcrypt');
const { application } = require("express");
const kafka = require('../kafka/client')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Create and Save a new Restaurant

exports.create = (req, res) => {

    req.body.path = "create";
    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: create", results)
        res.status(results.status).send(results.data);

    })

    // Validate request
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }

    // console.log("REST CREATE REQ BODY:", req.body)
    // // Create a Restaurant
    // const restaurant = new Restaurant({
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, salt),
    //     name: req.body.name,
    //     about: req.body.about,
    //     time_open: req.body.open,
    //     time_close: req.body.close,
    //     isPickup: req.body.isPickup,
    //     isDelivery: req.body.isDelivery,
    //     street: req.body.street,
    //     city: req.body.city,
    //     state: req.body.state,
    //     country: req.body.country,
    //     zipcode: req.body.zipcode,
    //     phoneno: req.body.phoneno,
    //     image: req.body.image,
    //     dishes: req.body.dishes,
    // });

    // // Save Restaurant in the database

    // console.log(restaurant)

    // restaurant
    //     .save(restaurant)
    //     .then(data => {
    //         console.log("PAYLOAD:", data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Restaurant."
    //         });
    //     });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {

    req.body.path = "findAll";
    req.body.city = req.query.city;
    // let newReq = {
    //     query: req.query,
    //     body: req.body,
    //     params: req.params
    // }

    console.log("req.query", req.query)
    console.log("req.body", req.body)
    console.log("req.params", req.params)
    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: findAll", results)
        res.status(results.status).send(results.data);

    })

    // console.log("city in controller", req.query.city)
    // const city = req.query.city;

    // Restaurant.find({ city: { $eq: city } })
    //     .then(data => {
    //         console.log("DATA:", data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Customer."
    //         });
    //     });

};

// Find a single Restaurant with a restaurantId
exports.findOne = (req, res) => {

    req.body.path = "update"
    req.body.restaurantId = req.params.restaurantId;

    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: update", results)
        res.status(results.status).send(results.data);

    })
    // Restaurant.findById(req.params.restaurantId, (err, data) => {
    //     if (err) {
    //         if (err.kind === "not_found") {
    //             res.status(404).send({
    //                 message: `Not found Restaurant with id ${req.params.restaurantId}.`
    //             });
    //         } else {
    //             res.status(500).send({
    //                 message: "Error retrieving Restaurant with id " + req.params.restaurantId
    //             });
    //         }
    //     } else res.send(data);
    // });
};

// Update a Restaurant identified by the restaurantId in the request
exports.update = (req, res) => {
    // Validate Request
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }
    req.body.path = "update"
    const id = req.params.restaurantId;
    req.body.id = id;

    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: update", results)
        res.status(results.status).send(results.data);

    })
    // Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`
    //             });
    //         } else res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Restaurant with id=" + id
    //         });
    //     });

};



exports.addDish = (req, res) => {

    req.body.path = "addDish";
    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: addDish", results)
        res.status(results.status).send(results.data);

    })


    // Validate request
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    // }


    // console.log("DISH CREATE REQ BODY:", req.body)

    // // console.log(req.body.restId);

    // // const restaurantId = req.body.restId;
    // const { restId, ...dish } = req.body;

    // console.log("RESTID", restId)
    // console.log("DISH", dish)

    // Restaurant.update(
    //     { _id: restId },
    //     { $push: { dishes: dish } }
    // )
    //     .then(response => {
    //         console.log("DONE", response);
    //         return res.status(200).send(response);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })

}

exports.editDish = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const dish = req.body;
    const dishId = req.params.dishId;
    const restId = req.params.restId;
    console.log("To Update:", dish)


    Restaurant.update(
        { _id: restId, "dishes._id": dishId },
        {
            $set: {
                "dishes.$.name": dish.name, "dishes.$.ingredient": dish.ingredient, "dishes.$.price": dish.price,
                "dishes.$.description": dish.description, "dishes.$.category": dish.category, "dishes.$.type": dish.type,
                "dishes.$.image": dish.image
            }
        }
    )
        .then(response => {
            console.log("DONE", response);
            return res.status(200).send(response);
        }).catch(err => {
            console.log("NOT DONE")
        })



}

exports.deleteDish = (req, res) => {

    req.body.path = "deleteDish";
    req.body.dishId = req.params.dishId;
    req.body.restId = req.params.restId;

    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: deleteDish", results)
        res.status(results.status).send(results.data);

    })
    // const dishId = req.params.dishId;
    // const restId = req.params.restId;

    // Restaurant.update(
    //     { _id: restId },
    //     { $pull: { dishes: { _id: dishId } } }
    // )
    //     .then(response => {
    //         console.log("DONE", response);
    //         return res.status(200).send(response);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })

}


exports.getEditDish = (req, res) => {

    // const dishId = req.params.dishId;
    // const restId = req.params.restId;
    // console.log(dishId)
    // console.log(restId)

    req.body.path = "getEditDish";
    req.body.dishId = req.params.dishId;
    req.body.restId = req.params.restId;

    // let newReq = {
    //     query: req.query,
    //     body: req.body,
    //     params: req.params
    // }

    console.log("req.query", req.query)
    console.log("req.body", req.body)
    console.log("req.params", req.params)
    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: getEditDish", results)
        res.status(results.status).send(results.data);

    })
    // Restaurant.find(

    //     { _id: restId }, "dishes"

    // ).then(response => {
    //     const data = response[0].dishes.find(dish => dish._id == dishId)

    //     console.log("DONE", data);
    //     return res.status(200).send(data);
    // }).catch(err => {
    //     console.log("NOT DONE")
    // })

}

exports.getRestIdsFromType = (req, res) => {

    console.log("HERE")
    let vegan = (req.query.vegan == 'true') ? 'Vegan' : '';
    let veg = (req.query.veg == 'true') ? 'Veg' : '';
    let nonVeg = (req.query.nonVeg == 'true') ? 'Non-Veg' : '';


    if (req.query.veg == 'false' && req.query.vegan == 'false' && req.query.nonVeg == 'false') {
        vegan = 'Vegan';
        veg = 'Veg';
        nonVeg = 'Non-Veg'
    }

    req.body.path = "getRestIdsFromType";
    req.body.vegan = vegan;
    req.body.veg = veg;
    req.body.nonVeg = nonVeg;

    console.log("VEG", veg)
    console.log("NV", nonVeg)
    console.log("VEGAN", vegan)

    // console.log("req.query", req.query)
    // console.log("req.body", req.body)
    // console.log("req.params", req.params)
    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: getRestIdsFromType", results)
        res.status(results.status).send(results.data);

    })
    // Restaurant.find({ "dishes.type": { $in: [veg, vegan, nonVeg] } })
    //     .then(response => {
    //         const restIds = response.map(r => {
    //             return r._id;
    //         })
    //         console.log("DONE", restIds);
    //         return res.status(200).send(restIds);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })
}

exports.getRestIdsFromDish = (req, res) => {
    // const dishName = req.query.dishName;
    // console.log("HI:" + dishName)
    req.body.path = "getRestIdsFromDish";
    req.body.dishName = req.query.dishName;

    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: getRestIdsFromDish", results)
        res.status(results.status).send(results.data);

    })
    // Restaurant.find({ "dishes.name": dishName })
    //     .then(response => {
    //         const restIds = response.map(r => {
    //             return r._id;
    //         })
    //         console.log("DONE", restIds);
    //         return res.status(200).send(restIds);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })

}

exports.getDishesbyRest = (req, res) => {


    req.body.path = "getDishesbyRest";
    req.body.restId = req.params.restId;;


    kafka.make_request('restaurant', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("rest-m-controller: getDishesbyRest", results)
        res.status(results.status).send(results.data);

    })

    // Restaurant.find({ _id: restId }, "dishes")
    //     .then(data => {
    //         console.log("dishesbyrest:", data[0].dishes)
    //         res.send(data[0].dishes);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while fetching the dishes."
    //         });
    //     });
}

// // Delete a Restaurant with the specified restaurantId in the request
            // exports.delete = (req, res) => {
            //     Restaurant.remove(req.params.restaurantId, (err, data) => {
            //         if (err) {
            //             if (err.kind === "not_found") {
            //                 res.status(404).send({
            //                     message: `Not found Restaurant with id ${req.params.restaurantId}.`
            //                 });
            //             } else {
            //                 res.status(500).send({
            //                     message: "Could not delete Restaurant with id " + req.params.restaurantId
            //                 });
            //             }
            //         } else res.send({ message: `Restaurant was deleted successfully!` });
            //     });
            // };

            // // Delete all Customers from the database.
            // exports.deleteAll = (req, res) => {
            //     Restaurant.removeAll((err, data) => {
            //         if (err)
            //             res.status(500).send({
            //                 message:
            //                     err.message || "Some error occurred while removing all customers."
            //             });
            //         else res.send({ message: `All Customers were deleted successfully!` });
            //     });
            // };