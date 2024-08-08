import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { Brand } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, res: NextResponse) {
  const { name, imageUrl, isArchived } = await request.json();
  console.log(name, imageUrl, isArchived);

  const token = request.cookies.get('tokenAraguaia')?.value;
  const authenticated = token ? await verifyToken(token) : false;

  if (!authenticated)
    return NextResponse.json('Sem autorização', { status: 401 });

  const brand = await prismadb.brand.create({
    data: {
      name,
      imageUrl,
      isArchived,
    },
  });

  return NextResponse.json(brand);
}

export async function GET() {
  const brands: Brand[] = await prismadb.brand.findMany();

  return new NextResponse(JSON.stringify(brands), {
    status: 200,
    statusText: 'OK',
  });
}
