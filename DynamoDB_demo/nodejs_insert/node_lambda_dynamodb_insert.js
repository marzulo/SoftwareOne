console.log('Loading function');

const AWS = require('aws-sdk');

const dynamoDBConfiguration = {
    'region': 'eu-south-1'
  };

AWS.config.update(dynamoDBConfiguration);
var ddb = new AWS.DynamoDB.DocumentClient();
var TableName = 'products-example';

async function removeItem(strproductcode, strproductname) {
    console.log("Function removeItem called...");
    try {
        var params = {
            'TableName': TableName,
            'Key': {
                'productcode' : strproductcode.toString(),
                'productname' : strproductname
            },
            'ReturnConsumedCapacity': 'TOTAL',
            'ReturnValues': 'ALL_OLD'
        };
        console.log("Data: %j",params);
    
        await ddb.delete(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('OK'+JSON.stringify(data));
        }).promise();
        return 0;
    } catch (err) {
        console.log("Error in removeItem "+err);
        return err;
    }
};

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        var vproductcode = event.productcode ? event.productcode : 'ERROR';
        var vproductname = event.productname ? event.productname : 'ERROR';
        
        if(vproductcode === 'ERROR' || vproductname === 'ERROR') {
            console.log('Hash and Range Keys missed in the payload. Exiting with error...');
            context.fail("Hash and Range Keys missed in the payload. Exiting with error...");
            return 1;
        }

        console.log('Calling removeItem:'+vproductcode+'/'+vproductname);
        var datareturn = await removeItem(vproductcode, vproductname);
        
        console.log('Removed productcode: '+vproductcode+' succesfully! '+datareturn);
        return 0;

    } catch (error) {
        console.log("Caught: " + error);
        context.fail("Caught: " + error);
        return 2;
    }
};
