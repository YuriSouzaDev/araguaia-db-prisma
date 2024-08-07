interface OptionalInputProps {
  name: string;
}

const OptionalInput: React.FC<OptionalInputProps> = ({ name }) => {
  return (
    <div>
      <div className="border-2 border-custom-borderLight rounded-md pb-3 pt-4 px-4 flex flex-wrap gap-2 relative">
        <label className="absolute left-0 -translate-y-7 ml-4 bg-white px-1 text-xs leading-4 duration-100 ease-linear">
          Opcionais <span className="text-sm text-red-500">*</span>
        </label>
        {/* {optionalsLoading ? (
          <p>Carregando opcionais...</p>
        ) : (
          optionals.map((optional) => (
            <div key={optional.id}>
              <input
                type="checkbox"
                name={name}
                value={optional.nome}
                id={name}
                className="p-2 text-sm font-medium border border-slate-400 rounded-md hover:text-custom-primary hover:border-custom-primary duration-100 ease-linear cursor-pointer"
              />
              <label htmlFor="name">{optional.nome}</label>
            </div>
          ))
        )} */}
      </div>
    </div>
  );
};

export default OptionalInput;
