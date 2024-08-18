const db = require("../Models/db");
const Order = db.orders;

const moment = require('moment');



const create = async (msg, callback) => {
    let res = {};
    // Validate request
    console.log("kafka-backend, MSG", msg)

    const order = new Order({
        restaurantId: msg.restId,
        restName: msg.restName,
        customer: msg.customer,
        orderTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        orderStatus: msg.orderStatus,
        orderFilter: msg.orderFilter,
        orderMode: msg.orderMode,
        total: msg.total,
        orderItems: msg.orderItems,
        orderNote: msg.note
    }
    )

    console.log("CREATE NEW ====> ", order)

    order
        .save()
        .then(data => {

            res.status = 200;
            res.data = data;

            console.log("PAYLOAD:", data)

            callback(null, res);
            // res.send(data);
        })
        .catch(err => {
            console.error(err);

            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while creating the Order."
            }

            callback(null, res)
        });
};

const getCustomersOrders = (msg, callback) => {
    let res = {};

    console.log("kafka-backend, MSG", msg)

    const { custId, orderStatus, pageLimit, pageNumber, path, ...body } = msg;

    const toSkip = (pageNumber - 1) * pageLimit;
    console.log("to skip", toSkip)

    if (orderStatus == 'All Orders') {
        Order.find(
            { "customer.customerId": custId }
        ).skip(toSkip).limit(pageLimit)
            .then(data => {
                res.status = 200;
                res.data = data;
                console.log("PAYLOAD:", data)
                callback(null, res);

                // res.send(data);
            })
            .catch(err => {

                console.error(err);

                res.status = 500;
                res.data = {
                    message: err.message || "Some error occurred while paginating orders."
                }

                callback(null, res)

            });

    }
    else {
        Order.find(
            { "customer.customerId": custId, orderStatus: orderStatus }

        ).skip(toSkip).limit(pageLimit)
            .then(data => {
                console.log("PAYLOAD:", data)
                res.status = 200;
                res.data = data;
                callback(null, res);

                // res.send(data);
            })
            .catch(err => {

                res.status = 500;
                res.data = {
                    message: err.message || "Some error occurred while paginating orders."
                }

                callback(null, res)
            });
    }


}

const getCustomerOrdersCount = (msg, callback) => {
    let res = {};

    console.log("kafka-backend, MSG", msg)

    const { custId, orderStatus, pageLimit, path, ...body } = msg;


    if (orderStatus == 'All Orders') {
        Order.find(
            { "customer.customerId": custId }
        )
            .then(data => {
                // const numberofPages = Math.ceil(data.length / pageLimit);
                // console.log("PAYLOAD:", numberofPages)
                res.status = 200;
                res.data = data;
                callback(null, res);
                // res.send(data);
            })
            .catch(err => {
                console.error(err);

                res.status = 500;
                res.data = {
                    message: err.message || "Some error occurred while paginating orders."
                }

                callback(null, res)
            });

    }
    else {
        Order.find(
            { "customer.customerId": custId, orderStatus: orderStatus }

        ).limit(pageLimit)
            .then(data => {
                console.log("PAYLOAD:", data.length)
                res.status = 200;
                res.data = data;
                callback(null, res);
                // res.send(data);
            })
            .catch(err => {
                res.status = 500;
                res.data = {
                    message: err.message || "Some error occurred while paginating orders."
                }

                callback(null, res)
            });
    }

}

const update = (msg, callback) => {

    let res = {};
    console.log("kafka-backend, MSG", msg)

    const { orderId, status, orderFilter, path, ...body } = msg;


    Order.updateOne({ _id: orderId },
        {
            $set: {
                orderStatus: status,
                orderFilter: orderFilter
            }
        })
        .then(data => {
            console.log("PAYLOAD:", data)
            res.status = 200;
            res.data = data;
            callback(null, res);
            // res.send(data);
        })
        .catch(err => {
            res.status = 500;
            res.data = {
                message: err.message || "Some error occurred while creating the Order."
            }

            callback(null, res)
        });


}


function handle_request(msg, callback) {

    console.log("Inside order kafka backend");

    if (msg.path === "create")
        create(msg, callback);

    else if (msg.path === "getCustomersOrders")
        getCustomersOrders(msg, callback);

    else if (msg.path === "getCustomerOrdersCount")
        getCustomerOrdersCount(msg, callback);

    else if (msg.path === "update")
        update(msg, callback);


    console.log("handle req, MSG", msg);
    console.log("msg path:", msg.path);


}




exports.handle_request = handle_request;

