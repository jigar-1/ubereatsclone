const Credential = require("../../models/credential-model.js");

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create and Save a new Credential
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Credential
    const credential = new Credential({
        email: req.body.userEmail,
        password: req.body.userPassword,
        isCustomer: req.body.isCustomer

    });

    // Save Credential in the database
    Credential.create(credential, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Credential."
            });
        else res.send(data);
    });
};

// Retrieve all Credentials from the database.
exports.findAll = (req, res) => {
    Credential.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving credentials."
            });
        else res.send(data);
    });
};

// Find a single Credential with a credentialId
exports.findOne = (req, res) => {
    Credential.findById(req.params.credentialId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Credential with id ${req.params.credentialId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Credential with id " + req.params.credentialId
                });
            }
        }

        else res.send(data);
    });
};

// Update a Credential identified by the credentialId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Credential.updateById(
        req.params.credentialId,
        req.body.email,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Credential with id ${req.params.credentialId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Credential with id " + req.params.credentialId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Credential with the specified credentialId in the request
exports.delete = (req, res) => {
    Credential.remove(req.params.credentialId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Credential with id ${req.params.credentialId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Credential with id " + req.params.credentialId
                });
            }
        } else res.send({ message: `Credential was deleted successfully!` });
    });
};

// Delete all Credentials from the database.
exports.deleteAll = (req, res) => {
    Credential.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all credentials."
            });
        else res.send({ message: `All Credentials were deleted successfully!` });
    });
};