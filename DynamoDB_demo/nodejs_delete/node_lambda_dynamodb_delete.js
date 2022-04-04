console.log('Loading function');

const AWS = require('aws-sdk');

const dynamoDBConfiguration = {
    'region': 'eu-south-1'
  };

AWS.config.update(dynamoDBConfiguration);
var ddb = new AWS.DynamoDB.DocumentClient();
var TableName = 'products-example';

async function putItem(strproductcode, strproductname, strproductprice) {
    console.log("Function putItem called...");
    try {
        var params = {
            'TableName': TableName,
            'Item': {
                'productcode' : strproductcode.toString(),
                'productname' : strproductname,
                'productprice' : strproductprice
            }
        };
        console.log("Data: %j",params);
        
        await ddb.put(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('OK'+JSON.stringify(data));
        }).promise();
        return 0;

    } catch (err) {
        console.log("Error in putItem "+err);
        return err;
    }
};

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        var vproductcode = event.productcode ? event.productcode : 'ERROR';
        var vproductname = event.productname ? event.productname : 'ERROR';
        var vproductprice = event.productprice ? event.productprice : 'ERROR';

        if(vproductcode === 'ERROR' || vproductname === 'ERROR') {
            console.log('Hash or Range Keys missed in the payload. Exiting with error...');
            context.fail("Hash or Range Keys missed in the payload. Exiting with error...");
            return 1;
        }

        if(vproductprice === 'ERROR') {
            console.log('productprice parameter missed in the payload. Exiting with error...');
            context.fail("productprice parameter missed in the payload. Exiting with error...");
            return 2;
        }

        console.log('Calling putItem:'+vproductcode+'/'+vproductname+'/'+vproductprice);
        var datareturn = await putItem(vproductcode, vproductname, vproductprice);
        console.log('Inserting productcode: '+vproductcode+' succeded! '+datareturn);
        return 0;

    } catch (error) {
        console.log("Caught: " + error);
        context.fail("Caught: " + error);
        return 3;
    }
};
