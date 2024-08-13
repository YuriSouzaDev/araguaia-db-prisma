import getBrands from '@/actions/get-brands';
import getOptinals from '@/actions/get-optionals';
import VehicleBreadcrumb from './components/VehicleBreadcrumb';
import VehicleForm from './components/VehicleForm';

export const runtime = 'edge';
export const revalidate = 0;

const VehiclePage = async () => {
  const brands = await getBrands();
  const optionals = await getOptinals();

  const brandOptions = brands.map((brand) => ({
    value: String(brand.id),
    label: brand.name,
  }));

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl text-custom-textBlack">
          Cadastrar veículo
        </h1>
        <VehicleBreadcrumb />
      </div>
      <VehicleForm brands={brands} />
    </div>
  );
};

export default VehiclePage;
