import prisma from '@/lib/prisma';
import { UserResponseDTO } from '@/domain/dtos/user/user-response.dto';

export class ListUserService {
  async execute(): Promise<UserResponseDTO[]> {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
}
