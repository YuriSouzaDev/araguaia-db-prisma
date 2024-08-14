import BrandBreadcrumb from './BrandBreadcrumb';
import { BrandColumn, brandColumns } from './columns';
import { DataTableBrands } from './data-table-brands';

interface BrandClientProps {
  data: BrandColumn[];
}

const BrandClient: React.FC<BrandClientProps> = ({ data }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-custom-textBlack">
          Lista de Marcas
        </h1>
        <BrandBreadcrumb />
      </div>
      <DataTableBrands columns={brandColumns} data={data} searchKey="name" />
    </div>
  );
};

export default BrandClient;
