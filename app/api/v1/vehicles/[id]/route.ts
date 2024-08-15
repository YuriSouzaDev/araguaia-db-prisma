import { userGet } from '@/actions/user-get';
import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Brand, Vehicle } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Função para lidar com requisições OPTIONS (geralmente usadas para CORS preflight checks)
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

const addCorsHeaders = (response: NextResponse) => {
  return new NextResponse(response.body, {
    ...response,
    headers: {
      ...response.headers,
      ...corsHeaders,
    },
  });
};

type FindById = {
  id: string;
};

const capitalize = (str: string) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export async function GET(request: Request, context: { params: FindById }) {
  try {
    const vehicle: Vehicle = await prismadb.vehicle.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
      include: {
        optionals: true,
        Images: true,
        brand: true,
        lastModifiedBy: true,
      },
    });

    const response = NextResponse.json(vehicle);
    return addCorsHeaders(response);
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
    await prismadb.vehicle.delete({
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
