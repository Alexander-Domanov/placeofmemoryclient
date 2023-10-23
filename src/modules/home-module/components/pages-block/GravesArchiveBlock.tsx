import { GrLinkNext } from 'react-icons/gr';
import { useRouter } from 'next/router';
import { Button } from '@/ui';
import { routes } from '@/common/routing/routes';

export const GravesArchiveBlock = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[159px]">
        <div className="bg-dark-900 pl-5 pt-8 w-[530px] h-[266px] flex flex-col text-light-300">
          <span className="text-7xl font-extralight leading-[64px]">
            Могилки
          </span>
          <span className="text-6xl font-semibold leading-[64px]">Архіў</span>
        </div>
        <Button
          variant="default"
          className="w-[200px] flex gap-4"
          onClick={() => push(routes.articles.index)}
        >
          Падрабязней
          <GrLinkNext size={17} />
        </Button>
      </div>
      <div className="absolute pl-5 pb-10 bottom-0 max-w-[470px] break-words text-sm text-light-300 leading-5">
        <p>
          Могілкі - гэта спецыяльны партал для людзей, якія цікавяцца гісторыяй
          і архіўнымі дадзенымі. На сайце ёсць інтэрактыўная мапа, дзе вы
          знойдзеце пахавання беларусаў на тэрыторыі Рэспублікі Польшчы.
        </p>
      </div>
    </div>
  );
};
