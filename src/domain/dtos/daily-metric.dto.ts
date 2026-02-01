import { UserResponseDTO } from "./user/user-response.dto";

export interface DailyMetricDTO {
  id: string;
  date: Date;
  count: number;
  user: UserResponseDTO;
  userId: string;
  updatedAt: Date;
  createdAt: Date;

  /** @unique [userId, date] - Chave composta para evitar duplicidade */
}
