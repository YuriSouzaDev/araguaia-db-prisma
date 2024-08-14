import { userGet } from '@/actions/user-get';
import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Brand } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type FindById = {
  id: string;
};

const capitalize = (str: string) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export async function GET(request: Request, context: { params: FindById }) {
  try {
    const brand: Brand = await prismadb.brand.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: 'Not Found',
    });
  }
}

export async function PUT(req: NextRequest, context: { params: FindById }) {
  const body = await req.json();
  const { name, imageUrl, isArchived } = body;
  const token = cookies().get('tokenAraguaia')?.value;
  const authenticated = token ? await verifyToken(token) : false;
  const { data: user } = await userGet();

  if (!authenticated)
    return NextResponse.json('Sem autorização', { status: 401 });

  if (!user || !user.id) {
    return NextResponse.json('Usuário não encontrado', { status: 404 });
  }

  const formattedName = capitalize(name);

  try {
    const updatedBrand: Brand = await prismadb.brand.update({
      where: {
        id: Number(context.params.id),
      },
      data: {
        name: formattedName,
        imageUrl,
        isArchived,
        lastModifiedById: user.id,
      },
    });

    return new NextResponse(JSON.stringify(updatedBrand), {
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
    await prismadb.brand.delete({
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
