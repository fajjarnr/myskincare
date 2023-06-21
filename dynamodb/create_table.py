import boto3


def create_table():

    DDB = boto3.resource('dynamodb', region_name='us-east-1')

    params = {
        'TableName': 'MyUsers',
        'KeySchema': [
            {'AttributeName': 'id', 'KeyType': 'HASH'}
        ],
        'AttributeDefinitions': [
            {'AttributeName': 'id', 'AttributeType': 'N'}
        ],
        'ProvisionedThroughput': {
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    }
    table = DDB.create_table(**params)
    table.wait_until_exists()
    print("Done")


if __name__ == '__main__':
    create_table()
