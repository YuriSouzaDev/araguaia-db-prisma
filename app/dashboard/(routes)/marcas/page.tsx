import prismadb from '@/lib/prisma/prismadb';
import { format } from 'date-fns';
import VehicleClient from './components/client';
import { BrandColumn } from './components/columns';

const Vehicles = async () => {
  const brands = await prismadb.brand.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedBanners: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    isArchived: item.isArchived,
    updatedAt: format(item.updatedAt, 'dd/MM/yyyy'),
    createdAt: format(item.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="animate-fadeIn">
      <VehicleClient data={formattedBanners} />
    </div>
  );
};

export default Vehicles;
