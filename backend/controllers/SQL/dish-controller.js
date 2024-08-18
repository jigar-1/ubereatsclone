const Dish = require("../models/dish-model.js");

// Create and Save a new Dish
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Dish
    const dish = new Dish({
        name: req.body.name,
        ingredient: req.body.ingredient,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        image: req.body.image,
        restId: req.body.restId

    });

    // Save Dish in the database
    Dish.create(dish, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Dish."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Dish.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dishes."
            });
        else res.send(data);
    });
};

// Find a single Dish with a dishId
exports.findOne = (req, res) => {
    Dish.findById(req.params.dishId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dish with id ${req.params.dishId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Dish with id " + req.params.dishId
                });
            }
        } else res.send(data);
    });
};

// Update a Dish identified by the dishId in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Dish.updateById(
        req.params.dishId,
        new Dish(req.body),
        (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Dish with id ${req.params.dishId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Dish with id " + req.params.dishId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Dish with the specified dishId in the request
exports.delete = (req, res) => {
    Dish.remove(req.params.dishId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dish with id ${req.params.dishId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Dish with id " + req.params.dishId
                });
            }
        } else res.send({ message: `Dish was deleted successfully!`, data });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Dish.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all dishes."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};