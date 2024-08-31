import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { number } from 'src/@common/constants';

try {
  fs.readdirSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

@Controller('image')
@UseGuards(AuthGuard())
export class ImageController {
  @UseInterceptors(
    FilesInterceptor('images', number.MAX_IMAGE_COUNT, {
      storage: diskStorage({
        destination(req, file, cd) {
          cd(null, 'uploads/');
        },
        filename(req, file, cd) {
          const ext = extname(file.originalname);
          cd(null, basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fieldSize: number.MAX_IMAGE_SIZE },
    }),
  )
  @Post('/')
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const urls = files.map((file) => file.filename);

    return urls;
  }
}
