import { SubTaskDTO } from './subtask.dto';
import { UserResponseDTO } from './user/user-response.dto';

export interface TodoDTO {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: Date;
  user: UserResponseDTO;
  userId: string;
  subTasks: SubTaskDTO[];
  createdAt: Date;
  updatedAt: Date;
}
