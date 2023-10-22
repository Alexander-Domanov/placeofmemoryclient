import Link from 'next/link';
import { BiLogoFacebook, BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaTwitter } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { routes } from '@/common/routing/routes';
import { INavigationLinks, NAVIGATION_LINK } from '@/common/constants';
import { Container } from '@/components';

export const Footer = () => {
  return (
    <footer className="h-[417px] bg-dark-900">
      <Container>
        <div className="grid grid-cols-4 pt-[70px] font-light leading-6 text-sm text-light-300">
          <section className="font-kelsi grid text-3xl grid-cols-1">
            <Link href={routes.main}>MOGILKI</Link>
          </section>
          <nav className="flex flex-col gap-6">
            <span className="text-base font-semibold">Старонки</span>
            <ul className="flex flex-col gap-[14px]">
              {NAVIGATION_LINK.map(
                (navigationLink: INavigationLinks, index) => (
                  <li key={index}>
                    <Link key={index} href={navigationLink.link}>
                      {navigationLink.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
          <section className="flex flex-col gap-6">
            <span className="text-base font-semibold">Кантакты</span>
            <ul className="flex flex-col gap-6 cursor-pointer">
              <li className="flex gap-4 items-center ">
                <CiLocationOn size={20} />
                <span className="break-words w-[128px]">
                  1234 Sample Street Austin Texas 78704
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <BsTelephone size={20} />
                <span>512.333.2222</span>
              </li>
              <li className="flex gap-4 items-center">
                <AiOutlineMail size={20} />
                <span>sampleemail@gmail.com</span>
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-6">
            <span className="text-base font-semibold">Сацыяльныя сеткі</span>
            <ul className="flex gap-10 cursor-pointer">
              <li>
                <Link href="https://www.facebook.com/" aria-label="Facebook">
                  <BiLogoFacebook size={24} />
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/" aria-label="Twitter">
                  <FaTwitter size={24} />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/" aria-label="LinkedIn">
                  <BiLogoLinkedinSquare size={24} />
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </footer>
  );
};
