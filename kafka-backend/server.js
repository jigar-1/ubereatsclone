var connection = new require('./kafka/Connection');
const db = require("./Models/db");

//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
let Customer = require('./services/customer.js');
let Login = require('./services/login.js');
let Restaurant = require('./services/restaurant.js');
let Order = require('./services/order.js');

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

db.mongoose.connect(db.url, options)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log("Error connecting to mongo")
        process.exit();
    })

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', (message) => {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, (err, res) => {
            console.log('after handle' + res);
            let payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log("producer send:", data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
handleTopicRequest("customer", Customer)
handleTopicRequest("login", Login)
handleTopicRequest("restaurant", Restaurant)
handleTopicRequest("order", Order)
