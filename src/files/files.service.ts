import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Multer } from 'multer';

@Injectable()
export class FilesService {
    private s3Client: S3Client;

    constructor(private configService: ConfigService) {
        const bucketRegion = this.configService.get<string>('S3_BUCKET_REGION');
        const accessKey = this.configService.get<string>('S3_ACCESS_KEY')
        const screctKey = this.configService.get<string>('S3_SECRET_KEY')
        const bucketName = this.configService.get<string>('S3_BUCKET_NAME')

        this.s3Client = new S3Client({
            region: bucketRegion,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: screctKey,
            },
        });
    }

    async uploadPage(bookNum: string, seq: string, file: Multer.File) : Promise<string> {
        const key = `${bookNum}/${seq}`;
        const params = {
            Bucket: this.configService.get<string>('S3_BUCKET_NAME'),
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await this.s3Client.send(new PutObjectCommand(params));
        return `https://${this.configService.get<string>('S3_BUCKET_NAME')}.s3.amazonaws.com/${key}`;
        
    }
}
