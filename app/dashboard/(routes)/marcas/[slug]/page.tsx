'use client';

import BrandBreadcrumb from './components/BrandBreadcrumb';
import BrandForm from './components/BrandForm';

export const runtime = 'edge';

const VehiclePage = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl text-custom-textBlack">
          Cadastrar Marca
        </h1>
        <BrandBreadcrumb />
      </div>
      <BrandForm />
    </div>
  );
};

export default VehiclePage;
