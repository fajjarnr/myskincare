const AWS = require('aws-sdk');

exports.handler = async (event) => {
  AWS.config.update({ region: 'us-east-1' });

  const s3 = new AWS.S3();

  const bucketName = 'fajjarnr-report';
  const objectKey = 'report.html';

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  const url = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: objectKey,
    Expires: expiration,
  });

  return url;
};
