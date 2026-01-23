import { CreateUserInputDTO } from '@/domain/dtos/user/create-user.dto';
import { NextResponse } from 'next/server';
import {
  CreateUserService,
  UserAlreadyExistsError,
} from '../services/create-user-service';
import { buildResponse } from './../../helpers/api-response.helper';

export class CreateUserController {
  private readonly createUserService = new CreateUserService();
  public async handle(user: CreateUserInputDTO): Promise<NextResponse> {
    if (!user) {
      return this.handleError('No user');
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

    if (error === 'No user') {
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
