import { Injectable } from '@nestjs/common';
import { UserRepository } from '@auth/user.repository';
import { AuthCredentialsDto } from '@auth/dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
