import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('fileupload')
export class FileuploadController {


  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${Date.now()}${ext}`
          cb(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    console.log('File Uploaded', file);
    return { message: 'File Uploaded Successfully' };
  }
}
