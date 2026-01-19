import { CreateUserController } from '@/adapters/api/controllers/create-user-crontroller';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  
  const controller = new CreateUserController();

  return controller.handle(await request.json());
}
