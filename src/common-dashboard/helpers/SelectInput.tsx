import { Select } from 'antd';

interface SelectInputProps {
  defaultValue: { value: string; label: string };
  options: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  defaultValue,
  options,
  onChange,
}) => (
  <Select
    labelInValue
    defaultValue={defaultValue}
    style={{
      width: 120,
      // boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
      borderRadius: '8px',
      marginLeft: '10px',
    }}
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
