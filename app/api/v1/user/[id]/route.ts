import prismadb from '@/lib/prisma/prismadb';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

type FindById = {
  id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
  try {
    const user: User = await prismadb.user.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

export async function PUT(request: NextRequest, context: { params: FindById }) {
  const newUserData: User = await request.json();

  try {
    const updatedUser: User = await prismadb.user.update({
      where: {
        id: Number(context.params.id),
      },
      data: newUserData,
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
      statusText: 'OK',
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: FindById },
) {
  try {
    await prismadb.user.delete({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(null, {
      status: 204,
      statusText: 'No Content',
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).meta?.cause;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: 'Not Found',
    });
  }
}
