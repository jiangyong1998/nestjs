import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('download')
  handleDownload(@Res() res: Response) {
    const url = join(__dirname, '../files/1701932315348.png');
    res.download(url);
  }

  @Get('download-stream')
  handleDownloadStream(@Res() res: Response) {
    const url = join(__dirname, '../files/1701932315348.png');
    const stream = new zip.Stream();
    stream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=file`);
    stream.pipe(res);
  }
}
