import json

import boto3
from boto3.dynamodb.conditions import Attr, Key, Not

TABLE_NAME_STR = 'MyUser'
INDEX_NAME_STR = 'special_GSI'
DDB = boto3.resource('dynamodb', region_name='ap-southeast-3')


def lambda_handler(event, context):

    offer_path_str = event.get('path')
    if offer_path_str is not None:
        return scan_index(event, context)
    else:
        pass
    print("running scan on table")

    DDB = boto3.resource('dynamodb', region_name='ap-southeast-3')

    TABLE = DDB.Table(TABLE_NAME_STR)

    response = TABLE.scan()

    data = response['Items']

    while 'LastEvaluatedKey' in response:
        response = TABLE.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        print("We needed to paginate and extend the response")
        data.extend(response['Items'])

    for item in data:
        if item.get('special') is not None:
            item['special_int'] = item.pop('special')
        item['id'] = item.pop('id')
        item['name'] = item.pop('name')
        item['email'] = item.pop('email')
        item['role'] = item.pop('role')

        if item.get('special_int') is not None:
            item['special_int'] = int(item['special_int'])

    return_me = {"user_item_arr": data}

    return return_me
