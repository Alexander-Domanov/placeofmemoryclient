import { Avatar, AvatarFallback, AvatarImage } from '@/ui';

interface AvatarComponentProps {
  src: string | null;
  alt: string;
}

export const AvatarComponent = ({ src, alt }: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage src={src || undefined} alt={alt} />
      <AvatarFallback>Ava</AvatarFallback>
    </Avatar>
  );
};
