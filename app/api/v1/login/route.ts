import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ message: 'Metodo invalido' }, { status: 405 });
    }

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Preencha os dados' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { userName: username },
    });

    if (!user || !(await compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Usuário ou senha inválido' },
        { status: 401 },
      );
    }

    const jwt = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    cookies().set('tokenAraguaia', jwt, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 2 * 60 * 60,
      path: '/',
    });

    return NextResponse.json(
      { message: 'Logado com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
