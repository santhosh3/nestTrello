import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BoardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(file: string, createBoardDto: Prisma.BoardCreateInput) {
    if (file === null) {
      return await this.databaseService.board.create({
        data: createBoardDto,
      });
    }
    return await this.databaseService.board.create({
      data: { ...createBoardDto, image: `http://localhost:3002/${file}` },
    });
  }

  async findAll() {
    return await this.databaseService.board.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        list: {
          where: {
            isDeleted: false,
          },
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            card: {
              where: {
                isDeleted: false,
              },
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: number) {
    // let uniquBoard = await this.databaseService.board.findUnique({
    //   where: {
    //     id: id,
    //     isDeleted: false,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     image: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     list: {
    //       where: {
    //         isDeleted: false,
    //       },
    //       select: {
    //         id: true,
    //         name: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         card: {
    //           where: {
    //             isDeleted: false,
    //           },
    //           select: {
    //             id: true,
    //             name: true,
    //             createdAt: true,
    //             updatedAt: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    let uniquBoard = await this.databaseService.board.findUnique({
      where: {
        id: id,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        list: {
          where: {
            isDeleted: false,
          },
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            card: {
              where: {
                isDeleted: false,
              },
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
    if(uniquBoard){
      let lists = uniquBoard['list'];
      let object = {};
      for(let ele of lists){
        object[ele['name']] = ele['card']
      }
      return object
    }  
  }


  async updateById(id: number, updateBoardDto: Prisma.BoardUpdateInput) {
    return await this.databaseService.board.update({
      where: {
        id,
      },
      data: updateBoardDto,
    });
  }

  async deleteById(id: number) {
    let listIds = await this.databaseService.list.findMany({
      where: {
        boardId: id,
      },
    });
    listIds.map(
      async (item) =>
        await this.databaseService.cards.updateMany({
          where: {
            listId: item['id'],
          },
          data: {
            isDeleted: true,
          },
        }),
    );
    return await this.databaseService.board.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        list: {
          updateMany: {
            where: {
              boardId: id,
            },
            data: {
              isDeleted: true,
            },
          },
        },
      },
    });
  }
}

function diskStorage(arg0: {
  destination: string;
  filename: (req: any, file: any, cb: any) => void;
}): any {
  throw new Error('Function not implemented.');
}
