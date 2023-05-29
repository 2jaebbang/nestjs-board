import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
