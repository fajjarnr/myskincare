import boto3
from boto3.dynamodb.conditions import Key


def update_table():

    DDB = boto3.client('dynamodb', region_name='ap-southeast-3')

    params = {
        'TableName': 'skincare',
        'AttributeDefinitions': [
            {'AttributeName': 'special', 'AttributeType': 'N'}
        ],
        'GlobalSecondaryIndexUpdates': [
            {
                'Create': {
                    'IndexName': 'special_GSI',
                    'KeySchema': [
                        {
                            'AttributeName': 'special',
                            'KeyType': 'HASH'
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 1,
                        'WriteCapacityUnits': 1
                    }
                }
            }
        ]
    }

    table = DDB.update_table(**params)
    print('Done')


if __name__ == '__main__':
    update_table()
