const Favourite = require("../models/favourites-model.js");
const axios = require('axios')

// Create and Save a new Favourite
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Favourite
    const favourite = new Favourite({
        custId: req.body.custId,
        restId: req.body.restId

    });

    // Save Favourite in the database
    Favourite.create(favourite, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Favourite."
            });
        else {

            res.send(data);
        }

    });
};

// Retrieve all Favourites from the database.
exports.findAll = (req, res) => {
    Favourite.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving favourites."
            });
        else res.send(data);
    });
};

// Find a single Favourite with a favouriteId
exports.findOne = (req, res) => {
    Favourite.findById(req.params.custId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favourite with id ${req.params.custId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Favourite with id " + req.params.custId
                });
            }
        } else res.send(data);
    });
};



// Update a Favourite identified by the favouriteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Favourite.updateById(
        req.params.favouriteId,
        new Favourite(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Favourite with id ${req.params.favouriteId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Favourite with id " + req.params.favouriteId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Favourite with the specified favouriteId in the request
exports.delete = (req, res) => {
    Favourite.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Favourite with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Favourite with id " + req.params.id
                });
            }
        } else res.send({ message: `Favourite was deleted successfully!` });
    });
};

// Delete all Favourites from the database.
exports.deleteAll = (req, res) => {
    Favourite.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all favourites."
            });
        else res.send({ message: `All Favourites were deleted successfully!` });
    });
};