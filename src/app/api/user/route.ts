import { CreateUserController } from '@/adapters/api/controllers/create-user-crontroller';
import { CreateUserService } from '@/adapters/api/services/create-user-service';

export function makeCreateUserController(): CreateUserController {
  const service = new CreateUserService();
  const controller = new CreateUserController(service);

  return controller;
}
