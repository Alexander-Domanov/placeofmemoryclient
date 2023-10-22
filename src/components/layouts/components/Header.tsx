import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { routes } from '@/common/routing/routes';
import { useUserStore } from '@/store/userStore';
import { DropdownMenuHeader } from '@/components';
import { INavigationLinks, NAVIGATION_LINK } from '@/common/constants';

export function Header() {
  const { userName } = useUserStore();
  return (
    <header className="h-[65px] bg-dark-900 flex items-center border-b ">
      <Container>
        <section className="flex justify-between font-normal leading-3 text-sm text-light-300">
          <div className="flex items-center font-kelsi text-xl">
            <Link href={routes.main}>MOGILKI</Link>
          </div>
          <nav>
            <ul className="flex gap-[56px] items-center">
              {NAVIGATION_LINK.map(
                (navigationLink: INavigationLinks, index) => (
                  <li key={index}>
                    <Link key={index} href={navigationLink.link}>
                      {navigationLink.title}
                    </Link>
                  </li>
                )
              )}
              {!userName ? (
                <>
                  <li>
                    <Link href={routes.auth.signIn}>Log in</Link>
                  </li>
                  <li>
                    <Link href={routes.auth.signUp}>SignUp</Link>
                  </li>
                </>
              ) : (
                <DropdownMenuHeader />
              )}
            </ul>
          </nav>
        </section>
      </Container>
    </header>
  );
}
