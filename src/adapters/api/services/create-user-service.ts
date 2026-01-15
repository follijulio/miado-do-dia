/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUserInputDTO } from '@/domain/dtos/user/create-user.dto';
import { UserResponseDTO } from '@/domain/dtos/user/user-response.dto';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class CreateUserService {
  private readonly SALT_ROUNDS = 10;

  async execute({
    name,
    email,
    password,
  }: CreateUserInputDTO): Promise<UserResponseDTO> {
    const passwordHash = await hash(password, this.SALT_ROUNDS);

    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          passwordHash: passwordHash,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      return user;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UserAlreadyExistsError(email);
      }
      throw error;
    }
  }
}
