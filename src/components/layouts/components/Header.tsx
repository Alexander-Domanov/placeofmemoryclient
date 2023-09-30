import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container } from '@/components/layouts/components/Containter';
import { routes } from '@/common/routing/routes';

export function Header() {
  const { replace, route } = useRouter();

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
            <ul className="flex gap-3">
              <li>
                <Link href={routes.auth.signIn}>LogIn</Link>
              </li>
              <li>
                <Link href={routes.auth.signUp}>SignUp</Link>
              </li>
            </ul>
          </nav>
        </section>
      </Container>
    </header>
  );
}
