import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  try {
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Preencha os dados' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { userName: username },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário inválido' },
        { status: 401 },
      );
    }

    if (!(await compare(password, user.password))) {
      return NextResponse.json({ message: 'Senha inválida' }, { status: 401 });
    }

    const jwt = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

    return NextResponse.json(
      { message: 'Logado com sucesso', token: jwt },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
