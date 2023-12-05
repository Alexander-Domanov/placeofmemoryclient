import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui';
import { useMeQuery } from '@/services';
import { StatusUser } from '@/types';
import { getColorStatusUser } from '@/modules/users-module/components/helpers/ColorStatusUserTag';
import { useTranslation } from '@/components/internationalization';

interface AvatarComponentProps {
  src: string | null;
  alt: string;
}

export const AvatarComponent = ({ src, alt }: AvatarComponentProps) => {
  const { t } = useTranslation();
  const { data: me } = useMeQuery();

  const avatarStyle =
    me?.status === StatusUser.BANNED
      ? { border: '2px solid red' }
      : { border: '2px solid #ffffff' };

  const status = getColorStatusUser(me?.status || null, t).text.toUpperCase();

  return (
    <Avatar>
      <AvatarImage
        src={src || undefined}
        alt={alt}
        style={avatarStyle}
        title={status}
      />
      <AvatarFallback className="border-2 border-light-100 bg-dark-[#1087f6]">
        <UserOutlined height={36} width={36} />
      </AvatarFallback>
    </Avatar>
  );
};
