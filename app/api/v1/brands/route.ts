import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Brand, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const capitalize = (str: string) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export async function POST(request: Request) {
  try {
    const { name, imageUrl, isArchived } = await request.json();
    const token = cookies().get('tokenAraguaia')?.value;
    const authenticated = token ? await verifyToken(token) : false;

    if (!authenticated)
      return NextResponse.json('Sem autorização', { status: 401 });
    const formattedName = capitalize(name);

    const existingBrand = await prismadb.brand.findUnique({
      where: { name: formattedName },
    });

    if (existingBrand) {
      return NextResponse.json(
        { message: 'Marca já existente.', fields: ['name'] },
        { status: 409 },
      );
    }

    const brand = await prismadb.brand.create({
      data: {
        name: formattedName,
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
            message: 'Marca já existente.',
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
