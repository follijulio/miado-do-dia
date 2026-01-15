import { buildResponse } from '@/adapters/helpers/api-response.helper';

import {
  CreateUserService,
  UserAlreadyExistsError,
} from '@/adapters/api/services/create-user-service';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createUserSchema } from '../schemas/create-user.schema';

export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle(requestBody: unknown): Promise<NextResponse> {
    try {
      const data = createUserSchema.parse(requestBody);

      const user = await this.createUserService.execute(data);

      return buildResponse({
        status: 201,
        message: 'User created successfully',
        data: user,
      });
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): NextResponse {
    if (error instanceof ZodError) {
      return buildResponse({
        status: 400,
        message: 'Validation Error',
        error: error.message,
      });
    }

    if (error instanceof UserAlreadyExistsError) {
      return buildResponse({
        status: 409,
        message: error.message,
        error: 'Conflict',
      });
    }

    console.error('CreateUserError:', error);
    return buildResponse({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}
