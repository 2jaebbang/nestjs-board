import { Module } from '@nestjs/common';
import { BoardsController } from '@boards/boards.controller';
import { BoardsService } from '@boards/boards.service';
import { BoardRepository } from '@boards/board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
