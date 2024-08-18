const db = require("../models/db");
const Order = db.orders;
const kafka = require('../kafka/client')

// var moment = require('moment');


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const path = "create";
    const msg = { ...req.body, path };
    kafka.make_request('order', msg, (err, results) => {

        console.log('req', msg)
        console.log("order-m-controller", results)
        res.status(results.status).send(results.data);

    })


    // console.log("ORDER CREATE REQ BODY:", req.body)

    // const order = new Order({
    //     restaurantId: req.body.restId,
    //     restName: req.body.restName,
    //     customer: req.body.customer,
    //     orderTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    //     orderStatus: req.body.orderStatus,
    //     orderFilter: req.body.orderFilter,
    //     orderMode: req.body.orderMode,
    //     total: req.body.total,
    //     orderItems: req.body.orderItems,
    //     orderNote: req.body.note
    // }
    // )
    // console.log("CREATE NEW", order)

    // order
    //     .save(order)
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

exports.getCustomersOrders = (req, res) => {


    const custId = req.params.custId;
    let orderStatus = req.query.orderStatus;
    const pageLimit = parseInt(req.query.pageLimit);
    const pageNumber = parseInt(req.query.pageNumber);

    const path = "getCustomersOrders"
    let msg = { ...req.body, custId };
    msg = { ...msg, orderStatus };
    msg = { ...msg, pageLimit };
    msg = { ...msg, pageNumber };
    msg = { ...msg, path }


    console.log("limit", pageLimit)
    console.log("pageSelected", pageNumber)
    console.log("custID backend: ", custId)
    console.log("ORDER STATUS backend: ", orderStatus)


    kafka.make_request('order', msg, (err, results) => {

        console.log('req', msg)
        console.log("order-m-controller", results)
        res.status(results.status).send(results.data);

    })

    // const toSkip = (pageNumber - 1) * pageLimit;
    // console.log("to skip", toSkip)

    // if (orderStatus == 'All Orders') {
    //     Order.find(
    //         { "customer.customerId": custId }
    //     ).skip(toSkip).limit(pageLimit)
    //         .then(data => {
    //             console.log("PAYLOAD:", data)
    //             res.send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send({
    //                 message:
    //                     err.message || "Some error occurred while creating the Customer."
    //             });
    //         });

    // }
    // else {
    //     Order.find(
    //         { "customer.customerId": custId, orderStatus: orderStatus }

    //     ).skip(toSkip).limit(pageLimit)
    //         .then(data => {
    //             console.log("PAYLOAD:", data)
    //             res.send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send({
    //                 message:
    //                     err.message || "Some error occurred while creating the Customer."
    //             });
    //         });
    // }


}



exports.getCustomerOrdersCount = (req, res) => {

    // console.log(req)
    const custId = req.params.custId;
    let orderStatus = req.query.orderStatus;
    const pageLimit = parseInt(req.query.pageLimit);

    console.log("custID backend: ", custId)
    console.log("ORDER STATUS backend: ", orderStatus)

    const path = "getCustomerOrdersCount"
    let msg = { ...req.body, custId };
    msg = { ...msg, orderStatus };
    msg = { ...msg, pageLimit };
    msg = { ...msg, path }


    kafka.make_request('order', msg, (err, results) => {

        console.log('req', msg)
        console.log("order-m-controller", results)
        res.status(results.status).send(results.data);

    })


    // if (orderStatus == 'All Orders') {
    //     Order.find(
    //         { "customer.customerId": custId }
    //     )
    //         .then(data => {
    //             // const numberofPages = Math.ceil(data.length / pageLimit);
    //             // console.log("PAYLOAD:", numberofPages)
    //             res.send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send({
    //                 message:
    //                     err.message || "Some error occurred while creating the Customer."
    //             });
    //         });

    // }
    // else {
    //     Order.find(
    //         { "customer.customerId": custId, orderStatus: orderStatus }

    //     ).limit(pageLimit)
    //         .then(data => {
    //             console.log("PAYLOAD:", data.length)
    //             res.send(data);
    //         })
    //         .catch(err => {
    //             res.status(500).send({
    //                 message:
    //                     err.message || "Some error occurred while creating the Customer."
    //             });
    //         });
    // }


}




exports.getRestaurantsOrders = (req, res) => {


    const restId = req.params.restId;
    let orderFilter = req.query.orderFilter;
    const pageLimit = parseInt(req.query.pageLimit);
    const pageNumber = parseInt(req.query.pageNumber);

    console.log("limit", pageLimit)
    console.log("pageSelected", pageNumber)
    console.log("restId backend: ", restId)
    console.log("ORDER FILTER backend: ", orderFilter)

    const toSkip = (pageNumber - 1) * pageLimit;
    console.log("to skip", toSkip)

    if (orderFilter == 'All Orders') {
        Order.find(
            { restaurantId: restId }
        ).skip(toSkip).limit(pageLimit)
            .then(data => {
                console.log("PAYLOAD:", data)
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            });

    }
    else {
        Order.find({
            restaurantId: restId,
            orderFilter: orderFilter
        }).skip(toSkip).limit(pageLimit)
            .then(data => {
                console.log("PAYLOAD:", data)
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            });
    }
}

exports.getRestaurantsOrdersCount = (req, res) => {

    // console.log(req)
    const restId = req.params.restId;
    let orderFilter = req.query.orderFilter;
    const pageLimit = parseInt(req.query.pageLimit);

    console.log("restID backend: ", restId)
    console.log("ORDER FILTER backend: ", orderFilter)

    if (orderFilter == 'All Orders') {
        Order.find(
            { restaurantId: restId }
        )
            .then(data => {
                const numberofPages = Math.ceil(data.length / pageLimit);
                console.log("PAYLOAD:", numberofPages)
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error while getting rest count"
                });
            });

    }
    else {
        Order.find({
            restaurantId: restId,
            orderFilter: orderFilter
        }).limit(pageLimit)
            .then(data => {
                console.log("PAYLOAD:", data.length)
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            });
    }
}



exports.update = (req, res) => {
    const status = req.body.status;
    const orderId = req.params.orderId;
    const filter = req.body.filter;

    const path = "update"
    let msg = { ...req.body, status }
    msg = { ...msg, path };
    msg = { ...msg, orderId };

    console.log("orderId", orderId)
    console.log("STAT", status)
    console.log("FILTER", filter)

    let orderFilter = filter;

    if (status == 'Delivered' || status == 'Picked Up')
        orderFilter = 'Completed Order'
    else if (status == 'Cancelled')
        orderFilter = 'Cancelled Order'

    msg = { ...msg, orderFilter };


    kafka.make_request('order', msg, (err, results) => {

        console.log('req', msg)
        console.log("order-m-controller", results)
        res.status(results.status).send(results.data);

    })


    // Order.updateOne({ _id: orderId },
    //     {
    //         $set: {
    //             orderStatus: status,
    //             orderFilter: orderFilter
    //         }
    //     })
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



    // if (res) {
    //     if (orderStatus == 'Delivered' || orderStatus == 'Picked Up') {
    //         sql.query("UPDATE orders SET orderFilter='Completed Order' WHERE id=?",
    //             [id],
    //             (err, res) => {
    //                 if (err) {
    //                     console.log("ERROR", err)
    //                 }
    //                 if (res)
    //                     console.log(res)
    //             })
    //     }
    //     if (orderStatus == 'Cancelled') {
    //         sql.query("UPDATE orders SET orderFilter='Cancelled Order' WHERE id=?",
    //             [id],
    //             (err, res) => {
    //                 if (err) {
    //                     console.log("ERROR", err)
    //                 }
    //                 if (res)
    //                     console.log(res)
    //             })
    //     }
    // }
}