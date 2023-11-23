import { FC, Fragment } from 'react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { routes } from '@/common/routing/routes';

interface BreadcrumbItem {
  text: string;
  link?: string;
  // icon?: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbMain: FC<BreadcrumbProps> = ({ items }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 640;
  return (
    <div className="whitespace-nowrap scrollbar scrollbar-none overflow-auto flex items-center gap-3 sm:gap-2 text-base font-light sm:text-md sm:mb-4 text-dark-100">
      <Link
        aria-label="хатняя старонка"
        href={routes.main}
        className="cursor-pointer"
      >
        <AiOutlineHome size={isMobile ? 16 : 18} />
      </Link>

      <div>/</div>

      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <Fragment key={index}>
            {index > 0 && <div>/</div>}

            {item.link ? (
              <Link
                href={item.link}
                className={`${
                  isLastItem
                    ? 'text-accent-100 cursor-pointer'
                    : 'cursor-pointer'
                }`}
              >
                {item.text}
              </Link>
            ) : (
              <span className={isLastItem ? 'text-accent-100' : ''}>
                {item.text}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbMain;
