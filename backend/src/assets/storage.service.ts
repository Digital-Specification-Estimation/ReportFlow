import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private s3: AWS.S3;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
      endpoint: this.configService.get('AWS_S3_ENDPOINT'),
      s3ForcePathStyle: true,
    });
    this.bucket = this.configService.get('AWS_S3_BUCKET');
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'assets'): Promise<string> {
    const key = `${folder}/${uuidv4()}-${file.originalname}`;

    await this.s3
      .upload({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
      })
      .promise();

    return key;
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn,
    });
  }

  async getFileBuffer(key: string): Promise<Buffer> {
    const result = await this.s3
      .getObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();

    return result.Body as Buffer;
  }
}
