import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// we inject
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async signup(email: string, password: string) {
    console.log('signup called', email);
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    //400 Bad Request
    const passwordHash = await bcrypt.hash(password, 10);

    return await this.prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  }

  async login(email: string, password: string) {
    console.log('login called', email, password);
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }

}
