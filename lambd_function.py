import json
import base64
import boto3
import string
import random

def lambda_handler(event, context):
    s3 = boto3.client("s3")
    dynamodb = boto3.resource('dynamodb')
  
    try: 
        get_file_content = event["body-json"]
        decode_content = base64.b64decode(get_file_content)
        pic_filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    
        # Upload image to S3
        s3_upload = s3.put_object(Bucket="biketime-img", Key=f"{pic_filename}.png", Body=decode_content, ContentType='image/png')
        
        # Get image metadata
        image_metadata = s3.head_object(Bucket='biketime-img', Key=f"{pic_filename}.png")
        
        content_length = image_metadata['ContentLength']
        last_modified = str(image_metadata['LastModified'])  # Convert to string
        
        # Add metadata to DynamoDB
        table = dynamodb.Table('biketime-table')
        table.put_item(Item={
            'name': str(pic_filename),
            'size': str(content_length),
            'time': last_modified
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps("WOhoo")
        }
    except Exception as e:
        # Return an error message if any exception occurs
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
