import { CreateUserInputDTO } from '@/domain/dtos/user/create-user.dto';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { UserResponseDTO } from '@/domain/dtos/user/user-response.dto';

export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class CreateUserService {
  async execute({
    name,
    email,
    password,
  }: CreateUserInputDTO): Promise<UserResponseDTO> {
    const passwordHash = await hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UserAlreadyExistsError(email);
      }
      throw error;
    }
  }
}
