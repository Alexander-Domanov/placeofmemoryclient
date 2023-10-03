import { ReactNode } from 'react';
import { Container } from '@/components';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container types="auth">
      <section className="w-[450px] h-screen">
        <video
          playsInline
          className="auth-sidebar-video object-cover h-full"
          autoPlay
          loop
          muted
          src="https://media.istockphoto.com/id/1406990292/video/bright-sunlight-breaks-through-lush-grass-waving-in-wind.mp4?s=mp4-640x640-is&k=20&c=Wg69EHKzHPK8-KVau4NYV88A4Fs7nmLc_aqDiwJRPsM="
        >
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="flex-grow flex align-middle justify-center">
        <div className="flex flex-col gap-3 w-[416px]">{children}</div>
      </section>
    </Container>
  );
};
