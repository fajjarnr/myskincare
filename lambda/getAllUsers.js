const AWS = require('aws-sdk');

exports.handler = async (event, callback) => {
  AWS.config.update({ region: 'us-east-1' });
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'MyUsers',
  };

  const data = await dynamoDb.scan(params).promise();

  return data;
};
