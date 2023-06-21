const AWS = require('aws-sdk');

exports.handler = async (event) => {
    // Get the image data from the event object
    const imageData = event.body;

    // Generate a random file name
    const fileName = `${Math.random().toString(36).substring(2)}.jpg`;

    // Create an S3 client
    const s3 = new AWS.S3();

    // Upload the image to S3
    await s3.putObject({
        Bucket: 'fajjarnr-image-assets',
        Key: `products/${fileName}`,
        Body: imageData
    }).promise();


    // Get the URL of the image
    const imageUrl = `https://fajjarnr-image-assets.s3.ap-southeast-3.amazonaws.com/${fileName}`;

    // Create a DynamoDB client
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    // Add the image URL to DynamoDB
    await dynamoDb.put({
        TableName: 'MyProducts',
        Item: {
            id: fileName,
            url: imageUrl
        }
    }).promise();

    // Return a response
    return {
        statusCode: 200,
        body: JSON.stringify({
            imageUrl: imageUrl
        })
    };
};
