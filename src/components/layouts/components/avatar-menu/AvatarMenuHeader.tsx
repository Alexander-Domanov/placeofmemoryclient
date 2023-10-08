import { Avatar, AvatarFallback, AvatarImage } from '@/ui';
import { useUserStore } from '@/store/userStore';

export const AvatarMenuHeader = () => {
  const { userName } = useUserStore();
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <span>{userName}</span>
    </div>
  );
};
