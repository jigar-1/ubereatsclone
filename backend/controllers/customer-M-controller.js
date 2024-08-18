const db = require("../models/db");
const Customer = db.customers;
// const db = require('./db.js')
const bcrypt = require('bcrypt');
const kafka = require('../kafka/client')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



exports.create = (req, res) => {
    const path = "create";
    const msg = { ...req.body, path };
    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })

    // Validate request
    // if (!req.body) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }


    // const customer = new Customer({
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, salt),
    //     name: req.body.name,
    //     about: req.body.about,
    //     dob: req.body.dob,
    //     nickname: req.body.nickname,
    //     phoneno: req.body.phoneno,
    //     profilePic: req.body.profilePic,
    //     addresses: req.body.addresses,
    //     favourites: req.body.favourites
    //     // orders: req.body.orders
    // }
    // )

    // // console.log(typeof customer.addresses)
    // // console.log(typeof customer.favourties)
    // console.log("CREATE NEW", customer)

    // customer
    //     .save(customer)
    //     .then(data => {
    //         console.log("PAYLOAD:", data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Customer."
    //         });
    //     });
};

exports.findAll = (req, res) => {
    const path = "all customers";
    const msg = { ...req.body, path };
    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })

    // Customer.find()
    //     .then(data => {
    //         console.log("GET ALL CUSTOMERS RESPONSE:", data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while fetching the favourites."
    //         });
    //     });
};

exports.getFavorites = (req, res) => {

    const path = "getFavorites";
    const id = req.params.id;
    let msg = { ...req.body, id };
    msg = { ...msg, path };

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', req.body)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })

    // console.log("FAV", req.params)
    // Customer.find({ _id: req.params.id }, "favourites")
    //     .then(data => {
    //         console.log("DATA1:", data[0].favourites)
    //         res.send(data[0].favourites);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Customer."
    //         });
    //     });
}

exports.addRestToFav = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    console.log(req.body.custId);
    console.log(req.body.restId);


    req.body.path = "addRestToFav";

    kafka.make_request('customer', req.body, (err, results) => {

        console.log('req', req.body)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // const id = req.body.restId;
    // Customer.findByIdAndUpdate(
    //     { _id: customerId },
    //     {
    //         $push: { favourites: restaurantId }
    //     })
    //     .then(response => {
    //         console.log("DONE", restaurantId);
    //         return res.status(200).send(restaurantId);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })

}


exports.delFav = (req, res) => {
    const restId = req.params.restId;
    const custId = req.params.custId;
    const path = "delFav"
    let msg = { ...req.body, restId }
    msg = { ...msg, custId }
    msg = { ...msg, path }
    console.log("inDel", restId)
    console.log("inDel", custId)

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // Customer.update(
    //     { _id: custId },
    //     { $pull: { favourites: restId } }
    // )
    //     .then(response => {
    //         console.log(response)
    //         return res.send(response)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

}

exports.addAddress = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    console.log("ADDRESS CREATE REQ BODY:", req.body)

    console.log(req.body.custId);
    const path = "addAddress";
    let msg = { ...req.body, path }

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // const customerId = req.body.custId;

    // const { custId, ...address } = req.body;

    // console.log("CUSTID", custId)
    // console.log("ADDRESS", address)

    // Customer.update(
    //     { _id: custId },
    //     { $push: { addresses: address } }
    // )
    //     .then(response => {
    //         console.log("DONE", response);
    //         return res.status(200).send(response);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })


}

exports.getAddresses = (req, res) => {
    const custId = req.params.custId;
    const path = "getAddresses"
    let msg = { ...req.body, custId }
    msg = { ...msg, path }

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // Customer.find({ _id: custId }, "addresses")
    //     .then(data => {
    //         console.log("DATA1:", data[0].addresses)
    //         res.send(data[0].addresses);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Customer."
    //         });
    //     });
}

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    const id = req.params.id;
    const path = "findOne";
    let msg = { ...req.body, id }
    msg = { ...msg, path }

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // Customer.findById(id)
    //     .then(data => {
    //         if (!data)
    //             res.status(404).send({ message: "No Customer with id " + id });
    //         else res.send(data);
    //     })
    //     .catch(err => {
    //         res
    //             .status(500)
    //             .send({ message: "Error retrieving Customer with id=" + id });
    //     });
}


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    const path = "update";
    let msg = { ...req.body, id }
    msg = { ...msg, path }

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })
    // const id = req.params.id;

    // Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
    //             });
    //         } else res.send(req.body);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Customer with id=" + id
    //         });
    //     });
};


exports.updateAddress = (req, res) => {
    const custId = req.params.custId;

    const address = req.body;

    const path = "updateAddress";
    let msg = { ...req.body, custId }
    msg = { ...msg, path }

    kafka.make_request('customer', msg, (err, results) => {

        console.log('req', msg)
        console.log("cust-m-controller", results)
        res.status(results.status).send(results.data);

    })

    // console.log("adddress to update:", address)
    // console.log("customer to update:", custId)

    // Customer.update({ _id: custId, "addresses._id": address.addressId },
    //     {
    //         $set: {
    //             "addresses.$.street": address.street,
    //             "addresses.$.city": address.city,
    //             "addresses.$.state": address.state,
    //             "addresses.$.country": address.country,
    //             "addresses.$.zipcode": address.zipcode,
    //         }
    //     }
    // )
    //     .then(response => {
    //         console.log("DONE", response);
    //         return res.status(200).send(address);
    //     }).catch(err => {
    //         console.log("NOT DONE")
    //     })

}
// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Customer.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            } else {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};