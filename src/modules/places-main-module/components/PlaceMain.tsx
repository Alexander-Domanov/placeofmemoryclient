import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineLeftCircle } from 'react-icons/ai';
import { useGetPlaceMain } from '@/modules/places-main-module';
import { ImageComponent } from '@/ui/image/ImageComponent';
import { routes } from '@/common/routing/routes';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { MarkupRenderer } from '@/common/helpers/MarkupRenderer';

export const PlaceMain = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  const { dataPlace } = useGetPlaceMain({ slug });
  const { width } = useWindowSize();

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
                <AiOutlineHome className="text-dark-100" size={22} />
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
                <h1 className="leading-6 sm:text-2xl break-words text-light-300 font-bold sm:leading-3 text-5xl">
                  {dataPlace.nameCemetery}
                </h1>
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
              <div className="flex flex-col gap-7 md:gap-3 sm:gap-3">
                <h2 className="text-5xl text-dark-100 font-light leading-7">
                  Месца знаходжання
                </h2>
                <span className="text-xl font-light leading-7">
                  {dataPlace.city}, {dataPlace.country}
                </span>
              </div>
              <div className="flex flex-col gap-7 md:gap-3 sm:gap-3">
                <h3 className="text-5xl font-light leading-7 text-dark-100">
                  Апісанне
                </h3>
                <section className="text-xl text-light-300 leading-7 break-words font-light">
                  <MarkupRenderer markup={dataPlace.description} />
                </section>
                <div className="flex gap-7 md:gap-3 sm:gap-3 flex-col mt-[70px]">
                  <h3 className="text-5xl font-light leading-7 text-dark-100">
                    На мапе
                  </h3>
                  <section className="">Карта</section>
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
