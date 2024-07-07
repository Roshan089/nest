import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaNoSpecService } from './prisma-no-spec/prisma-no-spec.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [PrismaNoSpecService],
})
export class AppModule {}
