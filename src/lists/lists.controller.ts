import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ListsService } from './lists.service';
import { Prisma } from '@prisma/client';

@Controller('lists')
export class ListsController {
    constructor(private readonly listService: ListsService){}

    @Post()
    create(@Body() createListDto: Prisma.ListCreateInput){
        return this.listService.create(createListDto);
    }

    @Get()
    findAll(){
        return this.listService.findAll();
    }

    
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.listService.findById(id)
    }

    @Get('/board/:id')
    findByBoardId(@Param('id', ParseIntPipe) id: number){
        return this.listService.findByBoardId(id)
    }

    @Put(':id')
    updateById(@Param('id', ParseIntPipe) id: number, @Body() updateListDto: Prisma.ListCreateInput){
        return this.listService.updateById(id, updateListDto);
    }

    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: number){
        return this.listService.deleteById(id);
    }

}
