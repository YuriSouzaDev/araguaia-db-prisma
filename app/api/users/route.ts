import prismadb from '@/lib/prisma/prismadb';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const newUser: User = await request.json();
  const createdUser: User = await prismadb.user.create({
    data: newUser,
  });

  return new NextResponse(JSON.stringify(createdUser), {
    status: 201,
    statusText: 'Created',
  });
}

export async function GET() {
  const users: User[] = await prismadb.user.findMany();

  return new NextResponse(JSON.stringify(users), {
    status: 200,
    statusText: 'OK',
  });
}
