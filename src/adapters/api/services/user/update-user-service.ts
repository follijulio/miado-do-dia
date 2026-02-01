import { UpdateUserResponseDTO } from '@/domain/dtos/user/update-user-response.dto';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { UpdateUserDTO } from './../../../../domain/dtos/user/update-user.dto';

export class UpdateUserService {
  async execute(
    id: string,
    user: UpdateUserDTO
  ): Promise<UpdateUserResponseDTO> {
    const passwordHash = await hash(user.password, 10);
    try {
      const response = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: user.email,
          name: user.name,
          passwordHash: passwordHash,
        },
        select: {
          email: true,
          name: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
