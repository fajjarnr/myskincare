import boto3
import json


def batch_put(banner_lists):
    DDB = boto3.resource('dynamodb', region_name='us-east-1')
    table = DDB.Table('MyCampaigns')
    with table.batch_writer() as batch:
        for banner in banner_lists:
            id = banner["id"]
            name = banner['name']
            imageUrl = banner['imageUrl']

            formatted_data = {
                'id': id,
                'name': name,
                'imageUrl': imageUrl
            }

            if "special" in banner:
                formatted_data['special'] = banner["special"]
                print("Adding special banner item:", name)
            else:
                print("Adding banner item:", name)
                pass
            batch.put_item(formatted_data)


if __name__ == '__main__':
    with open("../api-gateway/campaigns.json") as json_file:
        banner_lists = json.load(json_file)["Items"]
    batch_put(banner_lists)
