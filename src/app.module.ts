import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';
import { ListsModule } from './lists/lists.module';
import { CardModule } from './card/card.module';
import { FileuploadModule } from './fileupload/fileupload.module';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerModule } from './my-logger/my-logger.module';


@Module({
  imports: [
            ConfigModule.forRoot(),
            DatabaseModule,
            BoardModule,
            ListsModule, 
            CardModule, 
            FileuploadModule, MyLoggerModule,
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
