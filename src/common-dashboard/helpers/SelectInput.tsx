import { Select } from 'antd';
import { FC } from 'react';

interface SelectInputProps {
  defaultValue: { value: string; label: string };
  options: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }) => void;
}

const SelectInput: FC<SelectInputProps> = ({
  defaultValue,
  options,
  onChange,
}) => (
  <Select
    labelInValue
    defaultValue={defaultValue}
    style={{ width: 150 }}
    onChange={onChange}
    options={options}
  >
    {options.map((option) => (
      <Select.Option key={option.value} value={option.value}>
        {option.label}
      </Select.Option>
    ))}
  </Select>
);
export default SelectInput;
