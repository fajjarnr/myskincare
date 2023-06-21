const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fileContent = fs.readFileSync('./products.json');
const items = JSON.parse(fileContent);

const putRequests = items.map((item) => ({
  PutRequest: {
    Item: item,
  },
}));

const params = {
  RequestItems: {
    MyProducts: putRequests,
  },
};

dynamoDb.batchWrite(params, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Items added to table MyProducts`);
  }
});
