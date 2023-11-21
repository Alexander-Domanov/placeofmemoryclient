import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { IArticle } from '@/types';
import { routes } from '@/common/routing/routes';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';

interface Props {
  post: IArticle;
}

export const ArticleMain: FC<Props> = ({ post }) => {
  return (
    <div className="bg-dark-700 pt-[60px] md:pt-[28px] md:pb-[28px] pb-[60px] pl-[60px] pr-[60px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <div className="overflow-hidden">
          <BreadcrumbMain
            items={[
              { text: 'Артыкулы', link: routes.articles.index },
              { text: post.title },
            ]}
          />
        </div>

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-4xl sm:text-2xl">{post.title}</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="mt-10">
          <div className="mb-8 flex justify-center mx-auto max-w-[600px] max-h-[600px]">
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
