import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { routes } from '@/common/routing/routes';
import { useUserStore } from '@/store/userStore';
import { DropdownMenuHeader } from '@/components';
import { AUTH_LINK, NAVIGATION_LINK } from '@/common/constants';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { LanguageSwitcher } from '@/components/internationalization';
import { INavigationLinks } from '@/common/constants/NAVIGATION_LINK';

export function Header() {
  const { userName } = useUserStore();
  const { width } = useWindowSize();

  const NAVIGATION_USER_NAME = userName
    ? NAVIGATION_LINK()
    : [...NAVIGATION_LINK(), ...AUTH_LINK()];
  return (
    <header className="h-[65px] w-full fixed z-30 bg-dark-900  flex items-center border-b border-dark-900 ">
      <div className="container">
        <section className="flex justify-between items-center font-normal leading-3 text-sm text-light-300">
          <div className="flex items-center font-kelsi text-xl">
            <Link href={routes.main}>MOGILKI</Link>
          </div>
          {width && width > 1023 && (
            <nav className="flex justify-center align-middle items-center">
              <ul className="flex w-full gap-10 sm:gap-6 justify-center uppercase items-center">
                {NAVIGATION_USER_NAME.map(
                  (navigationLink: INavigationLinks, index) => (
                    <li key={index}>
                      <Link key={index} href={navigationLink.link}>
                        {navigationLink.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          )}
          <div className="flex gap-3 justify-between">
            {width && width <= 1023 && !userName && <DropdownMenuHeader />}
            {userName && <DropdownMenuHeader />}
            <LanguageSwitcher />
          </div>
        </section>
      </div>
    </header>
  );
}
