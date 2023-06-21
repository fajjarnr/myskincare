const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, callback) => {
  const productParams = {
    TableName: 'MyProducts',
  };

  const campaignParams = {
    TableName: 'MyCampaigns',
  };

  const product = await dynamoDb.scan(productParams).promise();
  const campaign = await dynamoDb.scan(campaignParams).promise();

  const response = {
    product: product,
    campaign: campaign,
  };

  return response;
};
