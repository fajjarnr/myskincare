import boto3
import json


def batch_put(user_lists):
    DDB = boto3.resource('dynamodb', region_name='us-east-1')
    table = DDB.Table('MyUsers')
    with table.batch_writer() as batch:
        for user in user_lists:
            id = user["id"]
            name = user['name']
            email = user['email']
            role = user['role']

            formatted_data = {
                'id': id,
                'name': name,
                'email': email,
                'role': role,
            }

            if "special" in user:
                formatted_data['special'] = user["special"]
                print("Adding special user item:", name)
            else:
                print("Adding user item:", name)
                pass
            batch.put_item(formatted_data)


if __name__ == '__main__':
    with open("../api-gateway/users.json") as json_file:
        user_lists = json.load(json_file)["Items"]
    batch_put(user_lists)
