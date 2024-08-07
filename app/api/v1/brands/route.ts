import prismadb from '@/lib/prisma/prismadb';
import { Brand } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const newBrand: Brand = await request.json();
  const createdBrand: Brand = await prismadb.brand.create({
    data: newBrand,
  });

  return new NextResponse(JSON.stringify(createdBrand), {
    status: 201,
    statusText: 'Created',
  });
}

export async function GET() {
  const brands: Brand[] = await prismadb.brand.findMany();

  return new NextResponse(JSON.stringify(brands), {
    status: 200,
    statusText: 'OK',
  });
}
