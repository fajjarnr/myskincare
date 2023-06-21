import boto3


def delete_table(resource=None):
    if resource is None:
        resource = boto3.resource('dynamodb')

    table = resource.Table('MySkinCare')
    table.delete()

    print(f"Deleting {table.name}...")
    table.wait_until_not_exists()


if __name__ == '__main__':
    delete_table()
    print("Table deleted!")
