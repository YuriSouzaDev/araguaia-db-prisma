import prismadb from '@/lib/prisma/prismadb';
import { format } from 'date-fns';
import VehicleClient from './components/client';
import { VehicleColumn } from './components/columns';

const Vehicles = async () => {
  const brands = await prismadb.vehicle.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    include: { createdBy: true, lastModifiedBy: true, brand: true },
  });

  const formattedBanners: VehicleColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: format(item.updatedAt, 'dd/MM/yyyy'),
    createdAt: format(item.createdAt, 'dd/MM/yyyy'),
    brandName: item.brand.name,
    lastModifiedByName: item.lastModifiedBy?.name || 'Desconhecido',
  }));

  return (
    <div className="animate-fadeIn">
      <VehicleClient data={formattedBanners} />
    </div>
  );
};

export default Vehicles;
