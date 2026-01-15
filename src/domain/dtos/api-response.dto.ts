export interface ApiResponseDTO<T = void> {
  success: boolean;
  httpStatus: number;
  message: string;
  data?: T;
  error?: string | null;
  timestamp: string;
}
