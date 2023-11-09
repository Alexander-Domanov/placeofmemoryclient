import { useRouter } from 'next/router';
import { IoEarthOutline } from 'react-icons/io5';
import Link from 'next/link';
import { GrLinkNext } from 'react-icons/gr';
import { AiOutlineLeftCircle, AiFillHome } from 'react-icons/ai';
import { useGetPlaceMain } from '@/modules/places-main-module';
import { ImageComponent } from '@/ui/image/ImageComponent';
import { routes } from '@/common/routing/routes';
import { Button } from '@/ui';
import { useWindowSize } from '@/common/hooks/useWindowResize';

export const PlaceMain = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  const { dataPlace } = useGetPlaceMain({ slug });
  const { width } = useWindowSize();

  // eslint-disable-next-line react/no-unstable-nested-components
  const MarkupRenderer = ({ markup }: { markup: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: markup }} />;
  };
  const prevPageLabel = (
    <div className="flex mt-[50px]">
      <Link href={routes.places.index}>
        <AiOutlineLeftCircle
          className="cursor-pointer"
          size={56}
          fill="#bdc1c7"
          aria-label="prevPageLabel"
        />
      </Link>
    </div>
  );
  return (
    <div className="flex flex-col">
      {dataPlace && (
        <>
          <div className="flex flex-col">
            <div className="flex items-center sm:text-xs sm:justify-center md:justify-center lg:justify-center   text-dark-100 gap-3 mb-5 text-xl leading-[64px] font-light">
              <Link href={routes.main} className="cursor-pointer">
                <AiFillHome size={24} />
              </Link>
              /
              <Link
                href={routes.places.index}
                className="cursor-pointer flex gap-3 items-center justify-center"
              >
                <span>Архіў_Месца</span>/
              </Link>
              <span className="text-accent-100 underline">
                {dataPlace.nameCemetery}
              </span>
            </div>
            <h2 className="text-6xl sm:text-3xl sm:text-center md:text-center lg:text-center text-light-100 leading-[60px]">
              Архіў
              <span className="text-dark-100 font-light ">_Могілка</span>
            </h2>
          </div>
          <hr className="w-full mt-[28px] transform rotate-180" />
          <div className="flex mt-[100px] lg:justify-center lg:flex-wrap gap-[100px]">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className="leading-6 sm:text-2xl break-words text-light-300 font-bold sm:leading-3 text-5xl">
                  {dataPlace.nameCemetery}
                </h2>
              </div>
              <div className="flex lg:justify-center">
                <div className="flex md:w-[200px] md:h-[250px] w-[450px] h-[500px] bg-dark-900">
                  {dataPlace.photos.map((photo) => (
                    <ImageComponent
                      key={dataPlace.id}
                      alt={photo.alt}
                      className="object-cover "
                      width={width && width < 1023 ? 200 : 400}
                      height={width && width < 1023 ? 250 : 500}
                      src={photo.versions.huge.url}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[70px]">
              <div className="flex flex-col gap-3">
                <h2 className="text-5xl text-dark-100 font-light leading-7">
                  Месца знаходжання
                </h2>
                <span className="text-xl font-light leading-7">
                  {dataPlace.city}, {dataPlace.country}
                </span>
              </div>
              <div className="flex flex-col gap-7">
                <h2 className="text-5xl font-light leading-7 text-dark-100">
                  Апісанне
                </h2>
                <div className="text-xl text-light-300 leading-7 break-words font-light">
                  <MarkupRenderer markup={dataPlace.description} />
                </div>
                <div className="flex gap-3 md:gap-4 items-center flex-wrap mt-[70px]">
                  <div className="flex gap-3">
                    <IoEarthOutline size={24} />
                    <span className="text-light-300 text-xl font-light leading-7">
                      45.44221740005173, 9.153927906369892
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="default"
                      className="w-[200px] flex gap-4"
                      // onClick={() => push(routes.ex)}
                    >
                      НА МАПЕ
                      <GrLinkNext size={17} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {prevPageLabel}
        </>
      )}
    </div>
  );
};
