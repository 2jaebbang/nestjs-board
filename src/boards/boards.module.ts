import { Module } from '@nestjs/common';
import { BoardsController } from '@boards/boards.controller';
import { BoardsService } from '@boards/boards.service';
import { BoardRepository } from '@boards/board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
