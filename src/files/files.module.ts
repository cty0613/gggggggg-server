import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
