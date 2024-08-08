import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password, ...rest } = await request.json();

  const token = request.cookies.get('tokenAraguaia')?.value;
  const authenticated = token ? await verifyToken(token) : false;

  if (!authenticated)
    return new NextResponse('Sem autorização', { status: 401 });

  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: 'Email and password are required' }),
      {
        status: 400,
        statusText: 'Bad Request',
      },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser: User = await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
      ...rest,
    },
  });

  return new NextResponse(JSON.stringify(createdUser), {
    status: 201,
    statusText: 'Created',
  });
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('tokenAraguaia')?.value;
  const authenticated = token ? await verifyToken(token) : false;

  if (!authenticated)
    return new NextResponse('Sem autorização', { status: 401 });
  const users: User[] = await prismadb.user.findMany();

  return NextResponse.json(users);
}
