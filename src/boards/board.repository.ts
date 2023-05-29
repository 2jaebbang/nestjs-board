import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from '@boards/board.entity';
import { BoardStatus } from '@boards/board-status.enum';
import { CreateBoardDto } from '@boards/dto/create-board.dto';
import { User } from '@/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user: user,
    });

    await this.save(board);
    return board;
  }
}
