import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //sigbup router
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      dto,
    });

    return this.authService.signup(dto);
  }
  //sign in router
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
