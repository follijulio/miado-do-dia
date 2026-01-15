import { SubTaskDTO } from './subtask.dto';
import { UserDTO } from './user.dto';

export interface TodoDTO {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  user: UserDTO;
  userId: string;
  subTasks: SubTaskDTO[];
  createdAt: Date;
  updatedAt: Date;
}
