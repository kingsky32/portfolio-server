import { FileEntity } from './serializers/file.serializer';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  region: process.env.AWS_S3_REGION,
});

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: FileEntity,
  })
  async create(
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<FileEntity | null> {
    return this.fileService.create(file);
  }
}
