import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board wit id ${id}`);
    }
    return found;
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    console.log('result', result);
  }
}
