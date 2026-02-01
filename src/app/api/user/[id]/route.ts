import { NextRequest, NextResponse } from 'next/server';
import { UpdateUserController } from './../../../../adapters/api/controllers/user/update-user.controller';

export async function GET(context: { params: Promise<{ id: string }> }) {
  const params = await context.params;

  const { id } = params;

  return NextResponse.json(
    { message: 'GET method not implemented yet.' },
    { status: 501 }
  );
}

export async function DELETE(context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = params.id;
  return NextResponse.json(
    { message: 'DELETE method not implemented yet.' },
    { status: 501 }
  );
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const { id } = params;

  const user = await request.json();

  const controller = new UpdateUserController();
  const response = await controller.handle(id, user);
  return response;
}
