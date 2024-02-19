import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { Prisma } from '@prisma/client';

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService){}

    @Post()
    create(@Body() createCardDto: Prisma.CardsCreateInput){
        return this.cardService.create(createCardDto)
    }

    @Get()
    findAll(){
        return this.cardService.findAll()
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.cardService.findById(id)
    }

    @Get('/list/:id')
    findListById(@Param('id', ParseIntPipe) id: number){
        return this.cardService.findListById(id)
    }

    @Put(':id')
    updateById(@Param('id', ParseIntPipe) id: number, @Body() updateListDto: Prisma.CardsUpdateInput){
        return this.cardService.updateById(id,updateListDto)
    }

    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: number){
        return this.cardService.deleteById(id)
    }

}
