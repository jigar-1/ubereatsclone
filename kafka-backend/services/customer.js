const db = require("../Models/db");
const Customer = db.customers;
// const db = require('./db.js');
const bcrypt = require('bcryptjs');
// const kafka = require('../kafka/client')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);




const create = async (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const customer = new Customer({
        email: msg.email,
        password: bcrypt.hashSync(msg.password, salt),
        name: msg.name,
        about: msg.about,
        dob: msg.dob,
        nickname: msg.nickname,
        phoneno: msg.phoneno,
        profilePic: msg.profilePic,
        addresses: msg.addresses,
        favourites: msg.favourites
    })

    console.log("CREATE NEW ====> ", customer)
    console.log("name ====> ", customer.name)

    customer
        .save()
        .then(data => {

            res.status = 200;
            res.data = data;

            console.log("PAYLOAD:", data)

            callback(null, res);
            // res.send(data);
        })
        .catch(err => {
            console.log("Error 4")
            console.error(err);

            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while creating the Customer."
            }
            // res.status(500).send({
            //     message:
            //         err.message || "Some error occurred while creating the Customer."
            // });

            callback(null, res)
        });
};

// const findAll = async (msg, callback) => {

//     let res = {};
//     // Validate request
//     console.log("kafka-backend, MSG", msg)

//     Customer.find()
//         .then(data => {
//             res.status = 200;
//             res.data = data;

//             console.log("GET ALL CUSTOMERS RESPONSE:", data)

//             // res.send(data);
//             callback(null, res);
//         })
//         .catch(err => {
//             res.status = 500;
//             res.data = {
//                 message: err.message || "Some error occurred while fetching all Customer data."
//             }
//             callback(null, res)
//         });
// }

const getFavorites = async (msg, callback) => {

    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    Customer.find({ _id: msg.id }, "favourites")
        .then(data => {
            res.status = 200;
            res.data = data[0].favourites;
            console.log("DATA1:", data[0].favourites)
            callback(null, res);
            // res.send(data[0].favourites);
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while fetching all Customer data."
            }
            callback(null, res)

        });


}

const addRestToFav = (msg, callback) => {

    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const customerId = msg.custId;
    const restaurantId = msg.restId;
    Customer.findByIdAndUpdate(
        { _id: customerId },
        {
            $push: { favourites: restaurantId }
        })
        .then(response => {
            console.log("DONE", restaurantId);
            res.status = 200;
            res.data = restaurantId;
            callback(null, res);
            // return res.status(200).send(restaurantId);
        }).catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while adding rest to favourites."
            }
            callback(null, res)

        })
}

const delFav = (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const custId = msg.custId;
    const restId = msg.restId;

    Customer.update(
        { _id: custId },
        { $pull: { favourites: restId } }
    )
        .then(data => {
            console.log(data)
            res.status = 200;
            res.data = data;
            callback(null, res)
            // return res.send(data)
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while deleting favourite."
            }
            callback(null, res)
        })

}

const addAddress = (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const { custId, ...address } = msg;


    console.log("CUSTID", custId)
    console.log("ADDRESS", address)

    Customer.update(
        { _id: custId },
        { $push: { addresses: address } }
    )
        .then(data => {
            console.log("DONE", data);
            res.status = 200;
            res.data = data;
            callback(null, res)
            // return res.status(200).send(response);
        }).catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while adding address."
            }
            callback(null, res)
        })
}

const getAddresses = (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const custId = msg.custId;

    Customer.find({ _id: custId }, "addresses")
        .then(data => {
            console.log("DATA1:", data[0].addresses)
            res.status = 200;
            res.data = data[0].addresses;
            callback(null, res)
            // res.send(data[0].addresses);
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while adding address."
            }
            callback(null, res)

        })
}

const findOne = (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const id = msg.id;

    Customer.findById(id)
        .then(data => {
            if (!data) {
                res.status = 404;
                res.data = {
                    message: err.message || "Error retrieving Customer with id=" + id
                }
                callback(null, res)
                // res.status(404).send({ message: "No Customer with id " + id });
            }
            else {
                res.status = 200;
                res.data = data;
                callback(null, res)
            }
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Error retrieving Customer with id=" + id
            }
            callback(null, res)
        });
}

const update = (msg, callback) => {
    const { id, path, ...body } = msg;

    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)


    Customer.findByIdAndUpdate(id, body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status = 404;
                res.data = {
                    message: err.message || "Error! Could not find Customer with id=" + id
                }
                callback(null, res)
            } else {
                res.status = 200;
                res.data = body;
                console.log("updating done", res)
                callback(null, res);
                // res.send(req.body);
            }
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Error udpating Customer with id=" + id
            }
            callback(null, res)
        });
}

const updateAddress = (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)
    const { custId, path, ...address } = msg;

    Customer.update({ _id: custId, "addresses._id": address.addressId },
        {
            $set: {
                "addresses.$.street": address.street,
                "addresses.$.city": address.city,
                "addresses.$.state": address.state,
                "addresses.$.country": address.country,
                "addresses.$.zipcode": address.zipcode,
            }
        }
    )
        .then(data => {
            res.status = 200;
            res.data = address;
            console.log("updating DONE", res);
            callback(null, res);
            // return res.status(200).send(address);
        }).catch(err => {
            console.log("NOT DONE")
            res.status = 500;
            res.data = {
                message: err.message || "Error udpating address pf Customer with id=" + custId
            }
            callback(null, res)
        })
}

function handle_request(msg, callback) {

    console.log("Inside customer kafka backend");

    if (msg.path === "create")
        create(msg, callback);
    else if (msg.path === "findAll")
        findAll(msg, callback);
    else if (msg.path === 'getFavorites')
        getFavorites(msg, callback);
    else if (msg.path === 'addRestToFav')
        addRestToFav(msg, callback);
    else if (msg.path === 'delFav')
        delFav(msg, callback);
    else if (msg.path === 'addAddress')
        addAddress(msg, callback);
    else if (msg.path === 'getAddresses')
        getAddresses(msg, callback);
    else if (msg.path === 'findOne')
        findOne(msg, callback);
    else if (msg.path === 'update')
        update(msg, callback);
    else if (msg.path === 'updateAddress')
        updateAddress(msg, callback);

    console.log("handle req, MSG", msg);
    console.log("msg path:", msg.path);


}




exports.handle_request = handle_request;

