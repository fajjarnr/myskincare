import boto3
import json


def batch_put(product_list):
    DDB = boto3.resource('dynamodb', region_name='us-east-1')
    table = DDB.Table('MyProducts')
    with table.batch_writer() as batch:
        for product in product_list:
            id = product["id"]
            name = product['name']
            price = product['price']
            sales = product['sales']
            rating = product['rating']
            imageUrl = product['imageUrl']

            # for review in product:
            #     reviewId = review["reviewId"]
            #     userId = review["userId"]
            #     productId = review['productId']
            #     comment = review['comment']

            formatted_data = {
                'id': id,
                'name': name,
                'price': price,
                'sales': sales,
                'rating': rating,
                'imageUrl': imageUrl
                # 'reviewId': reviewId,
                # 'userId': userId,
                # 'productId': productId,
                # 'comment': comment
            }

            if "special" in product:
                formatted_data['special'] = product["special"]
                print("Adding special product item:", name, price)
            else:
                print("Adding product item:", name, price)
                pass
            batch.put_item(formatted_data)


if __name__ == '__main__':
    with open("../api-gateway/products.json") as json_file:
        product_list = json.load(json_file)["Items"]
    batch_put(product_list)
