const CustAddress = require("../models/custAddress-model.js");

// Create and Save a new CustAddress
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a CustAddress
    const custAddress = new CustAddress({
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip,
        custId: req.body.custId

    });

    // Save CustAddress in the database
    CustAddress.create(custAddress, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the CustAddress."
            });
        else res.send(data);
    });
};

// Retrieve all CustAddresss from the database.
exports.findAll = (req, res) => {
    CustAddress.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving custAddresss."
            });
        else res.send(data);
    });
};

// Find a single CustAddress with a custAddressId
exports.findOne = (req, res) => {
    CustAddress.findById(req.params.custId, (err, data) => {


        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found CustAddress with id ${req.params.custId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving CustAddress with id " + req.params.custId
                });
            }
        } else res.send(data);
    });
};



// Update a CustAddress identified by the custAddressId in the request
exports.update = (req, res) => {

    // console.log("here")
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    CustAddress.updateById(
        req.params.custId,
        req.body,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found CustAddress with id ${req.params.custId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating CustAddress with id " + req.params.custId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a CustAddress with the specified custAddressId in the request
exports.delete = (req, res) => {
    CustAddress.remove(req.params.custAddressId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found CustAddress with id ${req.params.custAddressId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete CustAddress with id " + req.params.custAddressId
                });
            }
        } else res.send({ message: `CustAddress was deleted successfully!` });
    });
};

// Delete all CustAddresss from the database.
exports.deleteAll = (req, res) => {
    CustAddress.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all custAddresss."
            });
        else res.send({ message: `All CustAddresss were deleted successfully!` });
    });
};