import { CreateUserController } from '../api/controllers/create-user-crontroller';
import { CreateUserService } from '../api/services/create-user-service';

export function makeCreateUserController(): CreateUserController {
  const service = new CreateUserService();
  const controller = new CreateUserController(service);

  return controller;
}
