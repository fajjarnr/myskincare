const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'MyUsers',
    Key: {
      id: Number(id),
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
