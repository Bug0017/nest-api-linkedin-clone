import { Observable, map } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() user: User) {
    return this.authService.createUser(user);
  }

  @Post('login')
  login(@Body() user: User): Observable<any> {
    return this.authService.validateUser(user).pipe(map((jwt)=>{
        return {
            token: jwt
        }
    }))
  }
} 
