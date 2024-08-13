import { useState } from 'react';
import Select, { SingleValue } from 'react-select';

interface DataSelect {
  value: string;
  label: string;
}

interface CustomSelectProps {
  loading: boolean;
  placeholder: string;
  id: string;
  data: DataSelect[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  data,
  id,
  loading,
  ...props
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<DataSelect>>(null);

  return (
    <Select
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderWidth: '2px',
          borderRadius: '4px',
          borderColor: '#6B737A',
          fontSize: '14px',
          '&:hover': {
            borderColor: '#6B737A',
          },
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: '#111827',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: '14px',
          background: state.isSelected ? '#4880FF' : '#FFFFFF',
          borderRadius: '0px',
          borderBottom: '1px solid #6B737A',
          transition: '.3s',
          cursor: 'pointer',
          '&:hover': {
            background: '#d1dbe4',
            color: 'black',
          },
        }),
        clearIndicator: (baseStyles) => ({
          ...baseStyles,
          transition: '.3s',
          cursor: 'pointer',
          '&:hover': {
            color: 'red',
          },
        }),
      }}
      isClearable
      placeholder={placeholder}
      isDisabled={loading}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={data}
      inputId={id}
      {...props}
    />
  );
};

export default CustomSelect;
