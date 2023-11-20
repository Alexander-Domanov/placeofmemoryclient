import { AvatarComponent } from '@/ui';
import { useUserStore } from '@/store/userStore';

export const AvatarMenuHeader = () => {
  const { urlAvatar } = useUserStore();
  return (
    <div className="flex items-center gap-3">
      <AvatarComponent src={urlAvatar} alt="user-avatar" />
    </div>
  );
};
