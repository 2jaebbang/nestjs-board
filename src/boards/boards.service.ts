import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from '@boards/board-status.enum';
import { BoardRepository } from '@boards/board.repository';
import { Board } from '@boards/board.entity';
import { CreateBoardDto } from '@boards/dto/create-board.dto';
import { User } from '@/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId= :userId', { userId: user.id });

    const boards = await query.getMany();
    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board wit id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .delete()
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }
}
