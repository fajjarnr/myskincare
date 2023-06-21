'''
    You must replace <FMI_1> with the table's Primary Key
'''

import boto3
import json
from boto3.dynamodb.conditions import Key


def get_one_item(id):

    DDB = boto3.client('dynamodb', region_name='us-east-1')

    response = DDB.get_item(TableName='MyProducts',
                            Key={
                                'id': {'N': id}
                            }
                            )

    data = response['Item']

    print(data)


if __name__ == '__main__':
    id = 1
    get_one_item(id)
