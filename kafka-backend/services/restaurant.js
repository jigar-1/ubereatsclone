const db = require("../Models/db");
const Restaurant = db.restaurants;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);




const create = async (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)


    const restaurant = new Restaurant({
        email: msg.email,
        password: bcrypt.hashSync(msg.password, salt),
        name: msg.name,
        about: msg.about,
        time_open: msg.open,
        time_close: msg.close,
        isPickup: msg.isPickup,
        isDelivery: msg.isDelivery,
        street: msg.street,
        city: msg.city,
        state: msg.state,
        country: msg.country,
        zipcode: msg.zipcode,
        phoneno: msg.phoneno,
        image: msg.image,
        dishes: msg.dishes,
    });

    console.log("CREATE NEW ====> ", restaurant)
    console.log("name ====> ", restaurant.name)

    restaurant
        .save()
        .then(data => {
            res.status = 200;
            res.data = data;
            console.log("PAYLOAD:", data)
            callback(null, res);
            // res.send(data);
        })
        .catch(err => {
            // console.log("Error 4")
            // console.error(err);
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while creating the Restaurant."
            }
            callback(null, res)
        });
};

const findAll = async (msg, callback) => {
    let res = {};
    console.log("IN REQ", msg)
    // console.log("city in controller======>", req.query.city)
    const city = msg.city;

    const firstHalf = await Restaurant.find({ city: { $eq: city } });
    const secondHalf = await Restaurant.find({ city: { $ne: city } });
    // data = {}
    console.log("FH", firstHalf)
    console.log("SH", secondHalf)
    const data = (firstHalf).concat(secondHalf);

    res.status = 200;
    res.data = data;
    console.log("DATA:", data)

    callback(null, res)
    // res.send(data);
    // })
    // .catch(err => {
    //     res.status = 500;
    //     res.data = {
    //         message: err.message || "Some error occurred while fetching Restaurants."
    //     }

    //     callback(null, res)
    // });
}

const findOne = async (msg, callback) => {
    let res = {};

    console.log("IN REQ", msg)
    Restaurant.findById(msg.restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status = 404;
                res.data = {
                    message: err.message || `Not found Restaurant with id ${msg.restaurantId}.`
                }

                callback(null, res)

            } else {
                res.status = 500;
                res.data = {
                    message: err.message || "Error retrieving Restaurant with id " + msg.restaurantId
                }

                callback(null, res)
            }
        } else {
            res.status = 200;
            res.data = data;
            console.log("DATA:", data)

            callback(null, res)
            // res.send(data);
        }
    });
}

const update = async (msg, callback) => {
    let res = {};
    const { id, path, ...rest } = msg;

    console.log("restId", id)
    console.log("path", path)
    console.log("rest", rest)
    Restaurant.findByIdAndUpdate(id, rest, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status = 404;
                res.message = `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`
                callback(null, res)

            } else {
                res.status = 200;
                res.data = rest;
                // const _id = data._id;

                console.log("data rest update", res)
                callback(null, res)
                // res.send(data);
            }
        })
        .catch(err => {
            res.status = 500
            res.message = "Error updating Restaurant with id=" + id;

            callback(null, res)
        });

}

const addDish = async (msg, callback) => {
    let res = {};
    console.log("DISH CREATE REQ BODY:", msg)

    // console.log(msg.restId);

    // const restaurantId = msg.restId;
    const { restId, ...dish } = msg;

    console.log("RESTID", restId)
    console.log("DISH", dish)

    Restaurant.update(
        { _id: restId },
        { $push: { dishes: dish } }
    )
        .then(data => {
            console.log("DONE", data);
            res.status = 200;
            res.data = data;
            callback(null, res)
            // return res.status(200).send(data);
        }).catch(err => {
            res.status = 500
            res.message = "Error adding dish for Restaurant with id=" + id;

            callback(null, res)
        })
}

const editDish = async (req, res) => {

}

const deleteDish = async (msg, callback) => {
    let res = {};
    console.log("In delete Dish", msg)
    // console.log("city in controller======>", req.query.city)
    const restId = msg.restId;
    const dishId = msg.dishId;


    Restaurant.update(
        { _id: restId },
        { $pull: { dishes: { _id: dishId } } }
    )
        .then(data => {
            console.log("DONE", data);
            res.status = 200;
            res.data = data;
            console.log("Dish to get:", data)
            callback(null, res)
            // res.status(200).send(response);
        }).catch(err => {
            console.log("NOT DONE")
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while fetching Restaurants."
            }

            callback(null, res)
        })
}

const getEditDish = async (msg, callback) => {
    let res = {};
    console.log("In getEdit Dish", msg)
    // console.log("city in controller======>", req.query.city)
    const restId = msg.restId;
    const dishId = msg.dishId;


    Restaurant.find(

        { _id: restId }, "dishes"

    ).then(response => {
        const data = response[0].dishes.find(dish => dish._id == dishId)

        console.log("DONE", data);
        res.status = 200;
        res.data = data;
        console.log("Dish to get:", data)
        callback(null, res)
        // return res.status(200).send(data);
    }).catch(err => {
        console.log("NOT DONE")
        res.status = 500;
        res.data = {
            message: err.message || "Some error occurred while fetching Restaurants."
        }

        callback(null, res)
    })


}

const getRestIdsFromType = async (msg, callback) => {

    let res = {};
    console.log("IN REQ", msg)
    let veg = msg.veg;
    let nonVeg = msg.nonVeg;
    let vegan = msg.vegan;

    Restaurant.find({ "dishes.type": { $in: [veg, vegan, nonVeg] } })
        .then(response => {
            const restIds = response.map(r => {
                return r._id;
            })

            console.log("DONE", restIds);
            res.status = 200;
            res.data = restIds;
            callback(null, res)

            // return res.status(200).send(restIds);
        }).catch(err => {
            console.log("NOT DONE")
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while fetching Restaurants."
            }

            callback(null, res)
        })
}

const getRestIdsFromDish = async (msg, callback) => {
    let res = {};
    console.log("IN REQ", msg)
    let dishName = msg.dishName;


    Restaurant.find({ "dishes.name": dishName })
        .then(response => {
            const restIds = response.map(r => {
                return r._id;
            })

            console.log("DONE", restIds);
            res.status = 200;
            res.data = restIds;
            callback(null, res)

            // return res.status(200).send(restIds);
        }).catch(err => {
            console.log("NOT DONE")
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while fetching Restaurants."
            }

            callback(null, res)
        })
}

const getDishesbyRest = async (msg, callback) => {
    let res = {};
    console.log("IN REQ", msg)
    let restId = msg.restId;

    Restaurant.find({ _id: restId }, "dishes")
        .then(data => {
            console.log("dishesbyrest:", data[0].dishes)
            res.status = 200;
            res.data = data[0].dishes;
            callback(null, res)
            // res.send(data[0].dishes);
        })
        .catch(err => {
            console.log("NOT DONE")
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while fetching Restaurants."
            }

            callback(null, res)
        });
}



function handle_request(msg, callback) {

    console.log("Inside restaurant kafka backend");

    if (msg.path === "create")
        create(msg, callback);
    else if (msg.path === "findAll") {
        console.log("in findall")
        findAll(msg, callback);
    }
    else if (msg.path === "findOne") {
        console.log("in findOne")
        findOne(msg, callback);
    }
    else if (msg.path === "update") {
        console.log("in udpate")
        update(msg, callback);
    }
    else if (msg.path === "addDish") {
        console.log("in addDish")
        addDish(msg, callback);
    }
    else if (msg.path === "getEditDish") {
        console.log("in getEditDish")
        getEditDish(msg, callback);
    }
    else if (msg.path === "deleteDish") {
        console.log("in deletetDish")
        deleteDish(msg, callback);
    } else if (msg.path === "getRestIdsFromDish") {
        console.log("in getRestIdsFromDish")
        getRestIdsFromDish(msg, callback);

    } else if (msg.path === "getRestIdsFromType") {
        console.log("in getRestIdsFromType")
        getRestIdsFromType(msg, callback);
    }
    else if (msg.path === "getDishesbyRest") {
        console.log("in getDishesbyRest")
        getDishesbyRest(msg, callback);
    }
    console.log("handle req, MSG", msg);
    console.log("msg path:", msg.path);


}

exports.handle_request = handle_request;

