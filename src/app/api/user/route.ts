import { NextRequest } from 'next/server';
import { CreateUserController } from './../../../adapters/api/controllers/create-user-controller';
import { ListUserController } from '@/adapters/api/controllers/list-user-controller';

export async function POST(request: NextRequest) {
  const controller = new CreateUserController();

  const user = await request.json();

  return await controller.handle(user);
}

export async function GET() {
  const controller = new ListUserController();

  return await controller.handle();
}
