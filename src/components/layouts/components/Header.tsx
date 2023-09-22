import { useRouter } from 'next/router';
import { Container } from '@/components/layouts/components/Containter';

export function Header() {
  const { replace, route } = useRouter();

  return (
    <header className="h-[60px] flex items-center text-white bg-dark-700 border-b border-dark-100">
      <Container>
        <div className="flex bg-red-400 justify-between">
          <div>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span
              className="block text-emerald-900"
              onClick={() => replace(route, undefined, { shallow: true })}
            >
              Minsk
            </span>
          </div>
          <div className="flex text-emerald-900 gap-3">
            <div>LogIn</div>
            <div>SignUp</div>
          </div>
        </div>
      </Container>
    </header>
  );
}
