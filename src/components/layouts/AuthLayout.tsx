import { ReactNode } from 'react';
import { Container } from '@/components';
import { useWindowSize } from '@/common/hooks/useWindowResize';

interface IAuthLayoutProps {
  children: ReactNode;
  videoSrc?: string;
}

const baseVideoSrc =
  'https://media.istockphoto.com/id/1406990292/video/bright-sunlight-breaks-through-lush-grass-waving-in-wind.mp4?s=mp4-640x640-is&k=20&c=Wg69EHKzHPK8-KVau4NYV88A4Fs7nmLc_aqDiwJRPsM=';

export const AuthLayout = ({
  children,
  videoSrc = baseVideoSrc,
}: IAuthLayoutProps) => {
  const { width } = useWindowSize();
  return (
    <Container types="auth">
      <div className="grid grid-cols-2 lg:flex lg:justify-center min-h-[calc(100vh-65px)] lg:pt-[70px] lg:pr-0 pr-10">
        {width && width > 1023 && (
          <section className="w-[450px] bg-accent-100 ">
            <video
              playsInline
              className="auth-sidebar-video object-cover w-full h-full"
              autoPlay
              loop
              muted
              src={videoSrc}
            >
              Your browser does not support the video tag.
            </video>
          </section>
        )}
        <section className="flex flex-col py-2 px-2 justify-center">
          <div className=" flex flex-col gap-3  align-middle sm:w-[320px] ms:w-[360px] w-[416px]">
            {children}
          </div>
        </section>
      </div>
    </Container>
  );
};
//
