import { CreateUserController } from '@/adapters/api/controllers/user/create-user-controller';
import { ListUserController } from '@/adapters/api/controllers/user/list-user-controller';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const controller = new CreateUserController();

  const data = await request.json();

  return await controller.handle(data);
}

export async function GET() {
  const controller = new ListUserController();

  return await controller.handle();
}
