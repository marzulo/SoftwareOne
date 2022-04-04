console.log('Loading function');

const AWS = require('aws-sdk');

const dynamoDBConfiguration = {
    'region': 'eu-south-1'
  };

AWS.config.update(dynamoDBConfiguration);
var ddb = new AWS.DynamoDB.DocumentClient();
var TableName = 'products-example';
//var IndexName = 'productcode-productname-index';

async function query(strproductcode) {
    console.log("Function query called...");
    try {
        var params = {
            'TableName': TableName,
            'KeyConditionExpression': 'productcode = :hkey',
            'ExpressionAttributeValues': {
                ':hkey': strproductcode.toString()
            },
            'ReturnConsumedCapacity': 'TOTAL'
        };
        //console.log("Data: %j",params);
        
        const callback = await ddb.query(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('OK'+JSON.stringify(data));
        }).promise();
        return callback.Items;

    } catch (err) {
        console.log("Error in query "+err);
        return err;
    }
};

exports.handler = async (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        var vproductcode = event.productcode ? event.productcode : 'ERROR';
        var vproductname = event.productname ? event.productname : 'ERROR';

        if(vproductcode === 'ERROR' || vproductname === 'ERROR') {
            console.log('Hash or Range Keys missed in the payload. Exiting with error...');
            context.fail("Hash or Range Keys missed in the payload. Exiting with error...");
            return 1;
        }

        console.log('Calling query:'+vproductcode+'/'+vproductname);
        const callreturn = await query(vproductcode);
        const jsonreturn = JSON.stringify(callreturn, null, 2).replace('[', ' ').replace(']', ' ');

        console.log('Returned '+jsonreturn+' for productcode: '+vproductcode+'!: ');
        
        /*const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: jsonreturn
        };*/
        return jsonreturn; //response;

    } catch (err) {
        console.log("Caught: " + err);
        context.fail("Caught: " + err);
        const response = {
            statusCode: 300,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: err
        };
        return response;
    }
};
