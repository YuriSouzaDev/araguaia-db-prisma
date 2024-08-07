import prismadb from '@/lib/prisma/prismadb';
import { Brand } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

type FindById = {
  id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
  try {
    const brand: Brand = await prismadb.brand.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });

    return new NextResponse(JSON.stringify(brand), {
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
  const newBrandData: Brand = await request.json();

  try {
    const updatedBrand: Brand = await prismadb.brand.update({
      where: {
        id: Number(context.params.id),
      },
      data: newBrandData,
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
