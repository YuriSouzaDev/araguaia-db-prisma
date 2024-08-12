import prismadb from '@/lib/prisma/prismadb';
import { format } from 'date-fns';
import OptionalClient from './components/client';
import { OptionalColumn } from './components/columns';

const OptionalsPage = async () => {
  const optionals = await prismadb.optional.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedBanners: OptionalColumn[] = optionals.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: format(item.updatedAt, 'dd/MM/yyyy'),
    createdAt: format(item.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="animate-fadeIn">
      <OptionalClient data={formattedBanners} />
    </div>
  );
};

export default OptionalsPage;
