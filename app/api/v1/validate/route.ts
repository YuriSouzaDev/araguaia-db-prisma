import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 },
      );
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);

    return NextResponse.json({ valid: true, payload });
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: 'Invalid token' },
      { status: 401 },
    );
  }
}
