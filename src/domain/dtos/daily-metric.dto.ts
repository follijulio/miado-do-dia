import { UserDTO } from "./user.dto";

export interface DailyMetricDTO {
  id: string;
  date: Date;
  count: number;
  user: UserDTO;
  userId: string;
  updatedAt: Date;
  createdAt: Date;

  /** @unique [userId, date] - Chave composta para evitar duplicidade */
}
