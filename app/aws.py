import os
import uuid

import boto3

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
)


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={"ACL": acl, "ContentType": file.content_type},
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def delete_from_s3(image_url):
    """
    Taken from Cleanstagram. FIXME check and see if needed
    """
    split_url = image_url.split(S3_LOCATION)
    if len(split_url) == 2:
        filename = image_url.split(S3_LOCATION)[1]
    else:
        # filename not from s3
        return {"ok": True}
    try:
        s3.delete_object(Bucket=BUCKET_NAME, Key=filename)
        return {"ok": True}
    except Exception as e:
        return {"errors": str(e)}
