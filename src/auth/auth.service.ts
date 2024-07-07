import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { dot } from 'node:test/reporters';
import { JwtService } from '@nestjs/jwt';
import { config } from 'node:process';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      //generate password  hash
      const hash = await argon.hash(dto.password);

      //save in database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user doesnot exist throw exception
    if (!user) throw new ForbiddenException('credentail incorrect');

    const pwMatch = await argon.verify(user.hash, dto.password);
    //if password doesnot match
    if (!pwMatch) throw new ForbiddenException('credentail incorrect');

    //send back the user

    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string): Promise<string> {
    const payLoad = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payLoad, {
      expiresIn: '15m',
      secret: secret,
    });
  }
}
