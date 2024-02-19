import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CardService {
    constructor(private readonly databaseService: DatabaseService){}

    async create(createCardDto: Prisma.CardsCreateInput){
        return await this.databaseService.cards.create({data: createCardDto})
    }

    async findAll() {
        return await this.databaseService.cards.findMany({
            where: {
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async findById(id: number) {
        return await this.databaseService.cards.findUnique({
            where: {
                id,
                isDeleted: false
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    }

    async findListById(id: number) {
        return await this.databaseService.list.findUnique({
            where: {
                id,
                isDeleted: false
            },
            select: {
                card: true
            }
        })
    }

    async updateById(id: number, updateCardDto: Prisma.CardsUpdateInput) {
        return await this.databaseService.cards.update({
            where : {
                id
            },
            data : updateCardDto
        })

    }

    async deleteById(id: number) {
        return await this.databaseService.cards.update({
            where : {
                id
            },
            data : {
                isDeleted: true
            }
        })
    }
}
