import { FC } from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaHandshake,
  FaInstagram,
  FaLocationDot,
  FaRegEnvelope,
  FaTelegram,
} from 'react-icons/fa6';
import { NAVIGATION_LINK } from '@/common/constants';
import { routes } from '@/common/routing/routes';
import { IContacts } from '@/types';
import { useTranslation } from '@/components/internationalization';

interface Props {
  contacts: IContacts;
}

export const SiteFooter: FC<Props> = ({ contacts }) => {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark-900 py-16">
      <div className="container">
        <div
          className="
          grid grid-cols-[160px_160px_1fr_200px] gap-24
          xl:gap-20
          lg:grid-cols-[120px_150px_1fr_150px] lg:gap-6
          sm:grid-cols-[120px_1fr] sm:gap-x-4 sm:gap-y-14"
        >
          <div className="sm:order-4 sm:col-span-2 sm:text-center">
            <div className="font-kelsi text-[32px] lg:text-2xl">
              <Link href={routes.main}>MOGILKI</Link>
            </div>
          </div>

          <div className="sm:order-2">
            <div className="text-base font-bold">{t.footer.pages}</div>

            <div className="mt-6">
              <ul className="text-sm font-light flex flex-col gap-4 sm:gap-3">
                {NAVIGATION_LINK().map((navigationLink) => (
                  <li key={navigationLink.link}>
                    <Link href={navigationLink.link}>
                      {navigationLink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sm:order-3 sm:overflow-hidden">
            <div className="text-base font-bold">{t.footer.contacts}</div>

            <div className="mt-6">
              <div className="flex flex-col gap-6 sm:gap-3">
                <div className="grid grid-cols-[20px_1fr] items-center gap-4 sm:grid-cols-[16px_1fr] sm:gap-3">
                  <div className="flex justify-center">
                    <FaLocationDot className="text-base" />
                  </div>

                  <div className="text-sm font-light leading-6">
                    {contacts.address}
                  </div>
                </div>

                <div className="grid grid-cols-[20px_1fr] items-center gap-4 sm:grid-cols-[16px_1fr] sm:gap-3">
                  <div className="flex justify-center">
                    <FaRegEnvelope className="text-base" />
                  </div>

                  <div className="text-sm font-light leading-none truncate">
                    <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-base font-bold mt-8 sm:mt-6">
              {t.footer.partners}
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-6 sm:gap-3">
                <div className="grid grid-cols-[20px_1fr] items-center gap-4 sm:grid-cols-[16px_1fr] sm:gap-3">
                  <div className="flex justify-center">
                    <FaHandshake className="text-base" />
                  </div>

                  <div className="text-sm font-light leading-6">
                    {contacts.socialNetworks.partners}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:order-1 sm:flex sm:items-center sm:gap-8 sm:col-span-2">
            <div className="text-base font-bold">{t.footer.socialNetworks}</div>

            <div className="mt-6 sm:mt-0">
              <ul className="flex gap-11 lg:gap-8">
                {contacts.socialNetworks.facebook && (
                  <li>
                    <a
                      href={contacts.socialNetworks.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF size={20} />
                    </a>
                  </li>
                )}

                {contacts.socialNetworks.telegram && (
                  <li>
                    <a
                      href={contacts.socialNetworks.telegram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaTelegram size={20} />
                    </a>
                  </li>
                )}

                {contacts.socialNetworks.instagram && (
                  <li>
                    <a
                      href={contacts.socialNetworks.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
