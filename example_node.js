console.log('Loading function');

const AWS = require('aws-sdk');
const { exit } = require('process');

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
    
        await ddb.put(params).promise();
    } catch (err) {
        console.log("Error in putItem "+err);
        return err;
    }
};

async function removeItem(strproductcode, strproductname) {
    console.log("Function removeItem called...");
    try {
        var params = {
            'TableName': TableName,
            'Key': {
                'productcode' : strproductcode.toString(),
                'productname' : strproductname
            }
        };
        console.log("Data: %j",params);
    
        await ddb.delete(params).promise();
    } catch (err) {
        console.log("Error in removeItem "+err);
        return err;
    }
};

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    try {
        var vaction = event.action ? event.action : 'ERROR';
        var vproductcode = event.productcode ? event.productcode : 'ERROR';
        var vproductname = event.productname ? event.productname : 'ERROR';
        var vproductprice = event.productprice ? event.productprice : 'ERROR';

        if(vproductcode === 'ERROR' || vproductname === 'ERROR') {
            console.log('Hash and Range Keys missed in the payload. Exiting with error...');
            context.fail("Hash and Range Keys missed in the payload. Exiting with error...");
            return("Hash and Range Keys missed in the payload. Exiting with error...");
        }

        switch (vaction) {
            case 'ERROR':
                console.log('Sorry, action missed in the payload. Exiting with error...');
                context.fail("Sorry, action missed in the payload. Exiting with error...");
                return("Sorry, action missed in the payload. Exiting with error...");
            case 'INSERT':
                if(vproductprice === 'ERROR') {
                    console.log('productprice parameter missed in the payload. Exiting with error...');
                    context.fail("productprice parameter missed in the payload. Exiting with error...");
                    return("productprice parameter missed in the payload. Exiting with error...");
                }
                console.log('Calling putItem:'+vproductcode+'/'+vproductname+'/'+vproductprice);
                await putItem(vproductcode, vproductname, vproductprice);
                break;
            case 'DELETE':
                console.log('Calling removeItem:'+vproductcode+'/'+vproductname);
                await removeItem(vproductcode, vproductname);
                break;
            default:
                console.log('Sorry, action '+vaction+' not yet implemented!');
                context.fail("Sorry, action "+vaction+" not yet implemented! Exiting with error...");
                return("Sorry, action "+vaction+" not yet implemented! Exiting with error...");
        }
        console.log('Action: '+vaction+' for productcode: '+vproductcode+' succeded!');
        //return(0);

    } catch (error) {
        console.log("Caught: " + error);
        context.fail("Caught: " + error);
        exit(-1);
    }
};
