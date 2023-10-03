import { ReactNode } from 'react';
import { Container } from '@/components';

interface AuthLayoutProps {
  children: ReactNode;
  image?: string;
}

export const AuthLayout = ({ children, image }: AuthLayoutProps) => {
  return (
    <Container types="auth">
      <section className="w-[450px]">{image}</section>
      <section className="flex-grow">
        <div className="flex flex-col gap-3 w-[416px]">{children}</div>
      </section>
    </Container>
  );
};
