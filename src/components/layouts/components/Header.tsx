import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { routes } from '@/common/routing/routes';
import { useUserStore } from '@/store/userStore';
import { DropdownMenuHeader } from '@/components';
import {
  AUTH_LINK,
  INavigationLinks,
  NAVIGATION_LINK,
} from '@/common/constants';
import { useWindowSize } from '@/common/hooks/useWindowResize';

export function Header() {
  const { userName } = useUserStore();
  const { width } = useWindowSize();

  const NAVIGATION_USER_NAME = userName
    ? NAVIGATION_LINK
    : [...NAVIGATION_LINK, ...AUTH_LINK];
  return (
    <header className="h-[65px] bg-dark-900 flex items-center border-b border-dark-900 ">
      <Container className="bg-dark-900 w-full">
        <section className="flex justify-between items-center font-normal leading-3 text-sm text-light-300">
          <div className="flex items-center font-kelsi text-xl">
            <Link href={routes.main}>MOGILKI</Link>
          </div>
          <nav>
            <ul className="flex gap-10 sm:gap-6 uppercase items-center">
              {width && width > 1023 ? (
                <>
                  {NAVIGATION_USER_NAME.map(
                    (navigationLink: INavigationLinks, index) => (
                      <li key={index}>
                        <Link key={index} href={navigationLink.link}>
                          {navigationLink.title}
                        </Link>
                      </li>
                    )
                  )}
                  {userName && (
                    <li>
                      <DropdownMenuHeader />
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <DropdownMenuHeader />
                </li>
              )}
            </ul>
          </nav>
        </section>
      </Container>
    </header>
  );
}
