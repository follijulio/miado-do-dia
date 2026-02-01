import { buildResponse } from '@/adapters/helpers/api-response.helper';
import { NextResponse } from 'next/server';
import { ListUserService } from '../../services/user/list-user-service';

export class ListUserController {
  private readonly listUserService = new ListUserService();

  public async handle(): Promise<NextResponse> {
    try {
      const response = await this.listUserService.execute();
      return buildResponse({
        status: 200,
        data: response,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): NextResponse {
        
    return buildResponse({
      status: 500,
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
