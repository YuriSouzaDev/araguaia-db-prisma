import NewItemButton from '@/components/shared/NewItemButton';

const Vehicles = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-custom-textBlack">
          Lista de Veículos
        </h1>
        <NewItemButton
          label="Adicionar Veículo"
          push={`/dashboard/veiculos/novo`}
        />
      </div>
    </div>
  );
};

export default Vehicles;
