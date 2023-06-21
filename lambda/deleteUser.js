const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
});

exports.handler = async (event) => {
    try {
        const {id} = event.pathParameters;

        const params = {
            TableName: 'MyUsers',
            Key: {
                id: Number(id),
            },
        };

        await dynamoDb.delete(params).promise();

        return {
            statusCode: 200,
            message: `success delete user id ${id}`,
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
};
