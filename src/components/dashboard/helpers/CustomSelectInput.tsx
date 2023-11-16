import { Select } from 'antd';
import { FC } from 'react';

interface SelectInputProps {
  defaultValue: { value: string; label: string };
  options: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }) => void;
}

export const CustomSelectInput: FC<SelectInputProps> = ({
  defaultValue,
  options,
  onChange,
}) => (
  <Select
    labelInValue
    title="Select a condition"
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