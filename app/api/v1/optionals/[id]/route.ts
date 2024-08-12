import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Optional } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const optional: Optional = await prismadb.optional.findUniqueOrThrow({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(optional);
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;
    const token = cookies().get('tokenAraguaia')?.value;
    const authenticated = token ? await verifyToken(token) : false;

    if (!authenticated)
      return NextResponse.json('Sem autorização', { status: 401 });

    if (!name) return new NextResponse('Nome é requedido.', { status: 400 });

    const optional: Optional = await prismadb.optional.update({
      where: {
        id: Number(params.id),
      },
      data: { name },
    });

    return NextResponse.json(optional);
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
  { params }: { params: { id: number } },
) {
  try {
    await prismadb.optional.delete({
      where: {
        id: Number(params.id),
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
