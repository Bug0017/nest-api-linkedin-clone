import { UserEntity } from './../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../models/user.interface';
import { from, map, Observable, switchMap } from 'rxjs';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 10));
  }

  validateUser({ email, password }) {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: ['id', 'email', 'password', 'firstName', 'lastName', 'role'],
        },
      ),
    )
      .pipe(
        switchMap((user: User) => {
          return from(bcrypt.compare(password, user.password)).pipe(
            map((isValidPassword) => {
              if (isValidPassword) {
                delete user.password;
                return user;
              }
            }),
          );
        }),
      )
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.jwtService.signAsync({ user });
          }
        }),
      );
  }

  createUser(user: User): Observable<User> {
    const { password } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({ ...user, password: hashedPassword }),
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
        );
      }),
    );
  }

  findUserById(id): Observable<User> {
    return from(this.userRepository.findOne(id, { relations: ['feeds'] })).pipe(
      map((user) => {
        delete user.password;
        return user;
      }),
    );
  }
}
