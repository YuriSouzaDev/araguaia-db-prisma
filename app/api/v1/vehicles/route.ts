import { userGet } from '@/actions/user-get';
import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Optional, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nome, marca } = await request.json();
    const opcionals = [1, 2];
    const token = cookies().get('tokenAraguaia')?.value;
    const authenticated = token ? await verifyToken(token) : false;
    const { data: user } = await userGet();

    if (!authenticated)
      return NextResponse.json('Sem autorização', { status: 401 });

    if (!user || !user.id) {
      return NextResponse.json('Usuário não encontrado', { status: 404 });
    }

    const brand = await prismadb.brand.findUnique({
      where: { id: +marca },
    });

    if (!brand) {
      return NextResponse.json('Marca não encontrada', { status: 404 });
    }

    const existingOptionals = await prismadb.optional.findMany({
      where: {
        id: { in: opcionals },
      },
    });

    console.log(nome, marca, opcionals);

    if (existingOptionals.length !== opcionals.length) {
      return new NextResponse('Some optionals were not found', { status: 404 });
    }

    const vehicle = await prismadb.vehicle.create({
      data: {
        name: nome,
        brandId: +marca,
        optionals: {
          connect: existingOptionals.map((opt) => ({ id: +opt.id })),
        },
        createdById: user.id,
        lastModifiedById: user.id,
      },
    });
    return NextResponse.json(vehicle);
  } catch (error) {
    console.log('[VEHICLE_POST}', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            message: 'Opcional já existente.',
            fields: error.meta?.target,
          },
          { status: 409 },
        );
      }
    }
  }
}

export async function GET() {
  const vehicles: Optional[] = await prismadb.vehicle.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      optionals: true,
    },
  });

  return NextResponse.json(vehicles);
}
0;
