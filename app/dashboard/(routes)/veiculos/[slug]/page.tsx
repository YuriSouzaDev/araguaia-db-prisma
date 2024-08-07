'use client';

import VehicleBreadcrumb from './components/VehicleBreadcrumb';
import VehicleForm from './components/VehicleForm';

export const runtime = 'edge';

const VehiclePage = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl text-custom-textBlack">
          Cadastrar veículo
        </h1>
        <VehicleBreadcrumb />
      </div>
      <VehicleForm />
    </div>
  );
};

export default VehiclePage;
