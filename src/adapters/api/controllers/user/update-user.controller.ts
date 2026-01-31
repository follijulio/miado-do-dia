import { buildResponse } from '@/adapters/helpers/api-response.helper';
import { UpdateUserDTO } from '@/domain/dtos/user/update-user.dto';
import { NextResponse } from 'next/server';
import { UpdateUserService } from '../../services/user/update-user-service';

export class UpdateUserController {
  private readonly updateUserService = new UpdateUserService();
  public async handle(id: string, user: UpdateUserDTO): Promise<NextResponse> {
    if (!user) {
      return this.handleError('No user data provided');
    }
    try {
      const response = await this.updateUserService.execute(id, user);
      return buildResponse({
        status: 200,
        message: 'User updated successfully',
        data: response,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
  private handleError(error: unknown): NextResponse {
    if (error === 'No user data provided') {
      return buildResponse({
        status: 400,
        message: error,
        error: 'Bad Request',
      });
    }
    return buildResponse({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
