import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ListsService {
    constructor(private readonly databaseService: DatabaseService) { }

    async create(createListDto: Prisma.ListCreateInput) {
        return await this.databaseService.list.create({
            data: createListDto
        })
    }

    async findAll() {
        return await this.databaseService.list.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                card: {
                    where:{
                        isDeleted: false
                    },
                    select:{
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }
            }
        })
    }

    async findById(id: number) {
        return await this.databaseService.list.findUnique({
            where: {
                id,
                isDeleted: false
            },
            include: {
                card: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
    }

    async findByBoardId(id: number) {
        return await this.databaseService.board.findUnique({
            where : {
                id,
                isDeleted: false
            },
            select : {
                name : true,
                image: true,
                list : {
                    where : {
                        isDeleted : false
                    },
                    select : {
                        id : true,
                        name : true,
                        createdAt : true,
                        updatedAt : true,
                        card : {
                            where:{
                                isDeleted: false
                            },
                            select:{
                                id: true,
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    }
                }
            }
        })
    }

    async updateById(id: number, updateListDto: Prisma.ListUpdateInput) {
        return await this.databaseService.list.update({
            where: {
                id
            },
            data: updateListDto
        })
    }

    async deleteById(id: number) {
        return await this.databaseService.list.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true,
                card : {
                    updateMany: {
                        where: {listId: id},
                        data : {
                            isDeleted : true
                        }
                    }
                }
            }
        })
    }
}
