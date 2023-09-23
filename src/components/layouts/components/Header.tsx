import { useRouter } from 'next/router';
import { Container } from '@/components/layouts/components/Containter';

export function Header() {
  const { replace, route } = useRouter();

  return (
    <header className="h-[60px] flex items-center border-b ">
      <Container>
        <div className="flex justify-between">
          <div>
            <span
              className="block text-emerald-900"
              onClick={() => replace(route, undefined, { shallow: true })}
            >
              Minsk
            </span>
          </div>
          <div className="flex gap-3">
            <div>LogIn</div>
            <div>SignUp</div>
          </div>
        </div>
      </Container>
    </header>
  );
}
