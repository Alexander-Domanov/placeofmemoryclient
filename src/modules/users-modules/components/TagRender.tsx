import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Tag } from 'antd';

export const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  let color = 'default-color';
  if (value === 'places') color = 'gold';
  if (value === 'persons') color = 'geekblue';
  if (value === 'articles') color = 'green';
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};
