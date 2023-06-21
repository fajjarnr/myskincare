import logging
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')


def lambda_handler(event, context):
    bucket_name = "fajjarnr-report"
    object_name = "report.html"
    expiration_in_seconds = 120

    try:
        presigned_url_str = s3_client.generate_presigned_url('get_object', Params={
            'Bucket': bucket_name, 'Key': object_name}, ExpiresIn=expiration_in_seconds)
        response = {"presigned_url_str": presigned_url_str}
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response
