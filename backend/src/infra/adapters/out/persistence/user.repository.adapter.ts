import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@/application/ports/out/repositories/user.repository.port';
import { User } from '../../../../domain/entities/user.entity';
import { PrismaService } from './prisma/prisma.service';
import { UserWithProfileTypeDto } from '@/application/dtos/user/user-with-profile-type.dto';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByIdWithProfileType(
    id: string,
  ): Promise<UserWithProfileTypeDto | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        restaurant: true,
        deliveryPerson: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }
}
