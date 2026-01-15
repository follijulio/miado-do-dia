import { NextResponse } from 'next/server';

interface ResponseOptions<T> {
  data?: T;
  status: number;
  message?: string;
  error?: string;
}

export function buildResponse<T>({
  data,
  status,
  message,
  error,
}: ResponseOptions<T>) {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      httpStatus: status,
      message: message || (error ? 'Error occurred' : 'Success'),
      data,
      error,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
