import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { IArticle } from '@/types';
import { routes } from '@/common/routing/routes';
import { useWindowSize } from '@/common/hooks/useWindowResize';

interface Props {
  post: IArticle;
}

export const ArticleMain: FC<Props> = ({ post }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[48px] pb-[120px]">
      <div className="container">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap scrollbar scrollbar-none overflow-auto flex items-center gap-3 text-xl font-light sm:text-sm sm:mb-4 text-dark-100">
            <Link href={routes.main} className="cursor-pointer">
              <AiOutlineHome size={isMobile ? 16 : 22} />
            </Link>

            <div>/</div>

            <Link href={routes.articles.index}>
              <span>Артыкулы</span>
            </Link>

            <div>/</div>

            <span className="text-accent-100">{post.title}</span>
          </div>
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-4xl sm:text-2xl">{post.title}</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="mb-8 flex justify-center mx-auto max-w-[600px] max-h-[450px]">
            <Image
              src={post.photos[0]?.versions.huge.url}
              alt={post.title}
              width={post.photos[0]?.versions.huge.width}
              height={post.photos[0]?.versions.huge.height}
              className="object-contain rounded-lg shadow-icon"
            />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="wysiwyg sm:text-sm"
          />
        </div>

        <Link
          href={routes.articles.index}
          className="mt-16 inline-flex text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
        >
          <BsArrowLeftCircleFill className="text-dark-300" />
          <span className="sr-only">Previous</span>
        </Link>
      </div>
    </div>
  );
};