import { TodoDTO } from './todo.dto';

export interface SubTaskDTO {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  todoId: string;
  todo: TodoDTO;
  createdAt: Date;
  updatedAt: Date;
}
