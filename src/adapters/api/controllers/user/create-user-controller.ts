import {
  CreateUserService,
  UserAlreadyExistsError,
} from '@/adapters/api/services/user/create-user-service';
import { buildResponse } from '@/adapters/helpers/api-response.helper';
import { CreateUserInputDTO } from '@/domain/dtos/user/create-user.dto';
import { NextResponse } from 'next/server';

export class CreateUserController {
  private readonly createUserService = new CreateUserService();
  public async handle(user: CreateUserInputDTO): Promise<NextResponse> {
    if (!user) {
      return this.handleError('UserAlreadyExistsError');
    }

    try {
      const response = await this.createUserService.execute(user);

      return buildResponse({
        status: 201,
        message: 'User created successfully',
        data: response,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): NextResponse {
    if (error instanceof UserAlreadyExistsError) {
      return buildResponse({
        status: 409,
        message: error.message,
        error: 'Conflict',
      });
    }

    if (error === 'UserAlreadyExistsError') {
      return buildResponse({
        status: 400,
        message: error,
        error: 'No user',
      });
    }

    return buildResponse({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
