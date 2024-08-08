import NewItemButton from '@/app/components/shared/NewItemButton';

const Vehicles = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-custom-textBlack">
          Lista de Marcas
        </h1>
        <NewItemButton
          label="Adicionar Marca"
          push={`/dashboard/marcas/novo`}
        />
      </div>
    </div>
  );
};

export default Vehicles;
