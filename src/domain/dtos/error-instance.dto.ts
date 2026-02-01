export interface ErrorInstance extends Error {
  metadata?: {
    cause?: string;
    [key: string]: unknown;
  };
}
