import { userGet } from '@/actions/user-get';
import verifyToken from '@/functions/verify-token';
import prismadb from '@/lib/prisma/prismadb';
import { supabase } from '@/lib/supabase';
import { Optional, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nome = formData.get('nome')?.toString();
    const marca = formData.get('marca')?.toString();
    const opcionals = [1, 2, 3, 4];

    // Verificar se o token e o usuário são válidos
    const token = cookies().get('tokenAraguaia')?.value;
    const authenticated = token ? await verifyToken(token) : false;
    const { data: user } = await userGet();

    if (!authenticated) {
      return NextResponse.json('Sem autorização', { status: 401 });
    }

    if (!user || !user.id || !marca || !nome) {
      return NextResponse.json('Usuário não encontrado ou dados incompletos', {
        status: 404,
      });
    }

    // Processar os arquivos de imagem
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: { url: string }[] = [];

    for (const imageFile of imageFiles) {
      const originalFileName = imageFile.name;
      const fileName = `${Date.now()}_${originalFileName}`;
      const { data, error } = await supabase.storage
        .from('vehicle-images')
        .upload(fileName, imageFile);

      if (error) {
        console.error('Erro ao fazer upload do arquivo:', error.message);
      } else if (data) {
        const url = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(fileName).data?.publicUrl;
        if (url) {
          imageUrls.push({ url });
        }
      }
    }

    if (imageFiles.length === 0) {
      return NextResponse.json('Pelo menos uma imagem é requerida', {
        status: 400,
      });
    }

    // Verificar se a marca existe
    const brand = await prismadb.brand.findUnique({
      where: { id: +marca },
    });

    if (!brand) {
      return NextResponse.json('Marca não encontrada', { status: 404 });
    }

    // Criar o veículo e associar as imagens
    const vehicle = await prismadb.vehicle.create({
      data: {
        name: nome,
        Images: {
          createMany: {
            data: imageUrls.map((image) => ({
              url: image.url,
            })),
          },
        },
        brandId: +marca,
        optionals: {
          connect: opcionals.map((optional) => ({ id: optional })),
        },
        createdById: user.id,
        lastModifiedById: user.id,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.log('[VEHICLE_POST]', error);
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

    return NextResponse.json('Erro interno do servidor', { status: 500 });
  }
}

export async function GET() {
  const vehicles: Optional[] = await prismadb.vehicle.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      optionals: true,
      Images: true,
      brand: true,
      lastModifiedBy: true,
    },
  });

  return NextResponse.json(vehicles);
}
