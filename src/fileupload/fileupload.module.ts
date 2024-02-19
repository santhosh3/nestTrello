import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';

@Module({
  imports: [],
  controllers: [FileuploadController]
})
export class FileuploadModule {}
