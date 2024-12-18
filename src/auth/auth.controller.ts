import { Controller, Get, Post, Body,  Res, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string, password: string}, @Res() res: any) {
    const data = await this.authService.login(loginDto);
    res.status(200).json({ data})
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMyData(@Req() req: Request) {
    return this.authService.getAllMyData(req['user']);
  }

  @Post('refresh-token')
  async refreshAccessToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }
  
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Headers('authorization') authHeader: string): Promise<{ message: string }> {
    const token = authHeader.split(' ')[1]; 
    return this.authService.logout(token);
  }
  
}
