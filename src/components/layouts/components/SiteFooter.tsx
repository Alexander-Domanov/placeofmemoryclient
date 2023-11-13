import { FC } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaLinkedin,
  FaLocationDot,
  FaRegEnvelope,
} from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa';
import { NAVIGATION_LINK } from '@/common/constants';
import { routes } from '@/common/routing/routes';

export const SiteFooter: FC = () => {
  return (
    <footer className="bg-dark-900 py-16">
      <div className="container">
        <div className="grid grid-cols-[160px_160px_300px_1fr] gap-24 lg:grid-cols-[120px_150px_200px_1fr] lg:gap-6">
          <div className="font-kelsi text-[32px] lg:text-2xl">
            <Link href={routes.main}>MOGILKI</Link>
          </div>

          <div>
            <div className="text-base font-bold">Старонкі</div>

            <div className="mt-6">
              <ul className="text-sm font-light flex flex-col gap-4">
                {NAVIGATION_LINK.map((navigationLink) => (
                  <li key={navigationLink.link}>
                    <Link href={navigationLink.link}>
                      {navigationLink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="text-base font-bold">Кантакты</div>

            <div className="mt-6">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[20px_1fr] items-center gap-4">
                  <div className="flex justify-items-center">
                    <FaLocationDot size={16} />
                  </div>

                  <div className="text-sm font-light leading-6">
                    1234 Sample Street Austin Texas 78704
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-center gap-4">
                  <div className="flex justify-items-center">
                    <FaRegEnvelope size={16} />
                  </div>

                  <div className="text-sm font-light leading-none">
                    <a href="mailto:sampleemail@gmail.com">
                      sampleemail@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-base font-bold">Сацыяльныя сеткі</div>

            <div className="mt-6">
              <ul className="flex gap-11 lg:gap-8">
                <li>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF size={20} />
                  </a>
                </li>

                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter size={20} />
                  </a>
                </li>

                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
