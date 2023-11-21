import { AvatarComponent } from '@/ui';
import { useUserStore } from '@/store/userStore';

interface Props {
  showName?: boolean;
}
export const AvatarMenuHeader = ({ showName = false }: Props) => {
  const { urlAvatar, userName } = useUserStore();
  return (
    <div className="flex items-center gap-3">
      <AvatarComponent src={urlAvatar} alt="user-avatar" />
      {showName && userName && <span className="text-white">{userName}</span>}
    </div>
  );
};
