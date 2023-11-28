import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { useUserStore } from '@/store/userStore';
import { DropdownMenuHeader, Logo } from '@/components';
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
    <header className="h-[65px] bg-dark-900  flex items-center border-b border-dark-900 sticky top-0 z-50">
      <Container className="bg-dark-900 w-full container">
        <section className="flex justify-between items-center font-normal leading-3 text-sm text-light-300">
          <Logo />
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
            <LanguageSwitcher />
            {width && width <= 1023 && !userName && <DropdownMenuHeader />}
            {userName && <DropdownMenuHeader />}
          </div>
        </section>
      </Container>
    </header>
  );
}
