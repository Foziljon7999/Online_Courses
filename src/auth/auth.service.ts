import { Injectable, NotFoundException,  UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const user = this.userRepository.create()
    user.username = createAuthDto.username;
    user.email = createAuthDto.email;
    user.password = await bcrypt.hash(createAuthDto.password, 10)
    await this.userRepository.save(user)
    return 'You are succesfully registered';
  }

  async login(loginDto: { email: string; password: string}){
    const user = await this.userRepository.findOneBy({ email: loginDto.email})
    if(!user) {
      throw new NotFoundException('User not found')
    }
    const checkPass = await bcrypt.compare(loginDto.password, user.password)
    if(!checkPass) {
      throw new NotFoundException('Password wrong')
    }
    const payload = { id: user.id, email: user.email, role: user.role}
    const accesToken = await this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d'})
    user.refreshToken = refreshToken;
    user.refreshToken=undefined
    user.password=undefined
   
    await this.userRepository.save(user)
    const { password, ...userData } = user
    return { userData, accesToken, refreshToken}
  }

  async getAllMyData(payload: any) {
  const user = await this.userRepository.findOneBy({ id: payload.id})
  user.refreshToken=undefined
  user.password=undefined
  return user
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string}> {
    try {
      const payload = this.jwtService.verify(refreshToken); 
      const user = await this.findById(payload.id)

      if (!user || user.refreshToken !== refreshToken) { 
        throw new UnauthorizedException('Yaroqsiz refresh token');
      }

      const newAccessToken = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Yaroqsiz yoki muddati tugagan refresh token');
    }
  }

  async logout(token: string): Promise<{ message: string }> {
    const payload = this.jwtService.verify(token, ) 
    const userId = payload.id
    return { message: 'Foydalanuvchi muvaffaqiyatli chiqdi' };
  }
}

