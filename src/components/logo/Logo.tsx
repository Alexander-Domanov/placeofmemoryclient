import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/common/routing/routes';
import logo from '@/assets/mogilki.svg';

export const Logo = () => {
  return (
    <Link href={routes.main}>
      <Image src={logo} alt="logo" />
    </Link>
  );
};
