import BrandBreadcrumb from './BrandBreadcrumb';
import { OptionalColumn, optionalColumns } from './columns';
import { DataTableOptionals } from './data-table-optionals';

interface OptionalClientProps {
  data: OptionalColumn[];
}

const OptionalClient: React.FC<OptionalClientProps> = ({ data }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-custom-textBlack">
          Lista de Opcionais
        </h1>
        <BrandBreadcrumb />
      </div>
      <DataTableOptionals
        columns={optionalColumns}
        data={data}
        searchKey="name"
      />
    </div>
  );
};

export default OptionalClient;
