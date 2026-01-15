import { DailyMetricDTO } from './daily-metric.dto';
import { TodoDTO } from './todo.dto';

export interface UserDTO {
  id: string;
  email: string;
  name?: string;
  todos: TodoDTO[];
  dailyMetrics: DailyMetricDTO[];
  createdAt: Date;
  updatedAt: Date;
}
