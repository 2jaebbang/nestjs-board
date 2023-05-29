import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '@auth/user.repository';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@auth/user.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      //토큰 유효한지 체크히기 위해 선언
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      //토큰이 클라이언트의 어느부분에서 오는지 체크
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
