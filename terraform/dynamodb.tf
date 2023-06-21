provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "Baru"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "N"
  }

  tags = {
    Name        = "Test"
    Environment = "production"
  }
}

