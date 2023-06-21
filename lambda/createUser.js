// const crypto = require('crypto');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

exports.handler = async (event) => {
  try {
    const { body } = JSON.parse(event);

    const item = {
      id: body.id,
      email: body.email,
      name: body.name,
      role: body.role,
      special: 1,
    };

    const params = {
      TableName: 'MyUsers',
      Item: item,
    };

    const data = await dynamodb.put(params).promise();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
