import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui';

interface AvatarComponentProps {
  src: string | null;
  alt: string;
}

export const AvatarComponent = ({ src, alt }: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage src={src || undefined} alt={alt} />
      <AvatarFallback className="border-2 border-light-100 bg-dark-[#1087f6]">
        <UserOutlined height={36} width={36} />
      </AvatarFallback>
    </Avatar>
  );
};
