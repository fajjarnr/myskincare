const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

async function getItem(id) {
  const params = {
    TableName: 'MyProducts',
    Key: {
      id: id,
    },
  };

  const result = await dynamodb.get(params).promise();

  return result.Item || null;
}

console.log(getItem(1));
