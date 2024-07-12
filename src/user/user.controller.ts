import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { Request } from 'express';
import { GetUser } from 'src/auth/dacorator/get_user.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getme(@GetUser('id') user: User, @GetUser('email') email: String) {
    //console.log(email);

    return user;
  }
  @Patch()
  editUser() {}
}
