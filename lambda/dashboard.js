const AWS = require('aws-sdk');

exports.handler = async (event, callback) => {
  AWS.config.update({ region: 'us-east-1' });
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const productParams = {
    TableName: 'MyProducts',
  };



  const campaignParams = {
    TableName: 'MyCampaigns',
  };

  const userParams = {
    TableName: 'MyUsers',
  };

  const product = await dynamoDb.scan(productParams).promise();
  const campaign = await dynamoDb.scan(campaignParams).promise();
  const user = await dynamoDb.scan(userParams).promise();

  const response = {
    product: product.Count,
    campaign: campaign.Count,
    user: user.Count,
  };

  return response;
};
