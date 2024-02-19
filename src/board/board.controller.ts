import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${file.originalname.split('.')[0]}-${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file,
    @Body() createBoardDto: Prisma.BoardCreateInput,
  ) {
    console.log(file, createBoardDto);
    if (file) {
      return this.boardService.create(file.filename, createBoardDto);
    }
    return this.boardService.create(null, createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get('/cards/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findById(id);
  }

  @Put(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: Prisma.BoardUpdateInput,
  ) {
    return this.boardService.updateById(id, updateBoardDto);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.deleteById(id);
  }
}
