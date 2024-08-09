import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Brand, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, imageUrl, isArchived } = await request.json();
    const token = cookies().get('tokenAraguaia')?.value;
    const authenticated = token ? await verifyToken(token) : false;

    if (!authenticated)
      return NextResponse.json('Sem autorização', { status: 401 });
    const brandName = await prismadb.brand.findUnique({
      where: {
        name,
      },
    });
    // if (brandName?.name === name) {
    //   return NextResponse.json('Ja existe uma marca com este nome', {
    //     status: 400,
    //   });
    // }
    const brand = await prismadb.brand.create({
      data: {
        name,
        imageUrl,
        isArchived,
      },
    });
    return NextResponse.json(brand);
  } catch (error) {
    console.log('[BRAND_POST}', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            message: 'Marca já existente. Tente novamente!',
            fields: error.meta?.target,
          },
          { status: 409 },
        );
      }
    }
  }
}

export async function GET() {
  const brands: Brand[] = await prismadb.brand.findMany();

  return new NextResponse(JSON.stringify(brands), {
    status: 200,
    statusText: 'OK',
  });
}
