import base64
import json
import boto3
import random
import string

def lambda_handler(event, context):
    
    s3 = boto3.client('s3')
    try:
        if "body-json" not in event:
            return {
                'statusCode': 400,
                'body': json.dumps('Error: Missing body-json in the event data.')
            }
        
        get_file_content = event["body-json"]
        
        # Convert string to bytes if necessary
        if isinstance(get_file_content, str):
            binary_data = get_file_content.encode('utf-8')
        else:
            binary_data = get_file_content
        # decode_content = base64.b64decode(get_file_content).encode('utf-8')


        # Ensure that the content is properly encoded in base64
        encoded_data = base64.b64encode(binary_data).decode('utf-8')

        # Continue with your logic...
        decode_content = base64.b64decode(encoded_data)

        pic_filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        
        s3_upload = s3.put_object(Bucket="biketime-img",Key=pic_filename+".png",Body=decode_content)

        
        return {
            'statusCode': 200,
            'body': json.dumps('The Object is Uploaded successfully!')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error: {}'.format(str(e)))
        }