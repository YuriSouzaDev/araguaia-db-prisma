import prismadb from '@/lib/prisma/prismadb';
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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url); // Cria um objeto URL a partir da URL da requisição
    const q = url.searchParams.get('q'); // Obtém o parâmetro de busca 'q' da URL

    if (!q || typeof q !== 'string') {
      return NextResponse.json(
        { error: 'A query parameter `q` is required.' },
        { status: 400, headers: corsHeaders },
      );
    }

    const searchTerm = q.toLowerCase(); // Converte o termo de busca para minúsculas

    // Realiza a busca no banco de dados usando Prisma
    const vehicles = await prismadb.vehicle.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } }, // Busca por nome do veículo, ignorando maiúsculas/minúsculas
          { brand: { name: { contains: searchTerm, mode: 'insensitive' } } }, // Busca por nome da marca, ignorando maiúsculas/minúsculas
          {
            optionals: {
              some: {
                name: { contains: searchTerm, mode: 'insensitive' }, // Busca por opcionais, ignorando maiúsculas/minúsculas
              },
            },
          },
        ],
      },
      include: {
        brand: true,
        optionals: true,
        Images: true,
      },
    });

    return NextResponse.json(vehicles, { headers: corsHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while searching for vehicles.' },
      { status: 500, headers: corsHeaders },
    );
  }
}
