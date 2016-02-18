/* global require */

// import modules
var AWS = require('aws-sdk');

// set login and configuration options
AWS.config.loadFromPath('./resources/aws_config.json');

// get the raw JSON
const getJsonFromDynamodb = function (callback) {

    // create the document client for making queries
    var docClient = new AWS.DynamoDB.DocumentClient();

    // get the minutes past the hour right now
    var minutes = new Date().getMinutes() + 60;

    // create the query parameters
    var params = {
        TableName: 'avl_target',
        IndexName: "elapsed_min-index",
        KeyConditions: {
            elapsed_min: {
                ComparisonOperator: 'EQ',
                AttributeValueList: [minutes]
            }
        }
    };

    // make the request to the dynamodb table
    docClient.query(params, function (err, data) {
        if (err) {
            console.error(JSON.stringify(err, null, 2));
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
};