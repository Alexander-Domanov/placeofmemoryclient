import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { routes } from '@/common/routing/routes';
import { useUserStore } from '@/store/userStore';
import { DropdownMenuHeader } from '@/components';

export function Header() {
  const { replace, route } = useRouter();
  const { userName } = useUserStore();

  return (
    <header className="h-[60px] flex items-center border-b ">
      <Container>
        <section className="flex justify-between">
          <div>
            <span
              className="block text-emerald-900"
              onClick={() => replace(route, undefined, { shallow: true })}
            >
              Minsk
            </span>
          </div>
          <nav>
            {!userName ? (
              <ul className="flex gap-3">
                <li>
                  <Link href={routes.auth.signIn}>LogIn</Link>
                </li>
                <li>
                  <Link href={routes.auth.signUp}>SignUp</Link>
                </li>
              </ul>
            ) : (
              <DropdownMenuHeader />
            )}
          </nav>
        </section>
      </Container>
    </header>
  );
}
