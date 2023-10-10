import { Avatar, AvatarFallback, AvatarImage } from '@/ui';

interface AvatarComponentProps {
  src: string | null;
}

export const AvatarComponent = ({ src }: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage src={src || undefined} />
      <AvatarFallback>Ava</AvatarFallback>
    </Avatar>
  );
};
