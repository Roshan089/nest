import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client';
@Injectable()
export class AuthService {
  signup() {
    return { mes: ' i ahve sign in' };
  }

  signin() {
    return { mes: 'i  have sign in ' };
  }
}
