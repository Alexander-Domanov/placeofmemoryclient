import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { ImageComponent } from '@/ui/image/ImageComponent';

import { useGetPlacesMain } from '@/modules/places-main-module';
import { routes } from '@/common/routing/routes';
import { MarkupRenderer } from '@/common/helpers/MarkupRenderer';
import { Input } from '@/ui';

export const PlacesMain = () => {
  const { dataPlaces } = useGetPlacesMain();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 text-xl leading-[64px] font-light sm:text-sm sm:mb-4 text-dark-100">
        <Link href={routes.main} className="cursor-pointer">
          <AiOutlineHome size={22} />
        </Link>

        <div>/</div>

        <span className="text-accent-100">Архіў_Месцаў</span>
      </div>

      <div className="flex justify-between md:justify-center md:flex-wrap gap-4">
        <h2 className="text-light-300 text-5xl sm:text-3xl">
          Архіў
          <span className="text-dark-100 font-light ">_Месцаў</span>
        </h2>
      </div>

      <hr className="w-full mt-[28px] mb-8 transform bg-[#565656]" />

      <div className="flex gap-4 mt-14">
        <div>
          <Input label="Назва" className="w-[166px] h-[36px]" />
        </div>
        <div>
          <Input label="Краіна" className="w-[166px] h-[36px]" />
        </div>
        <div>
          {' '}
          <Input label="Горад" className="w-[166px] h-[36px]" />
        </div>
      </div>
      {dataPlaces && dataPlaces.items.length > 0 ? (
        dataPlaces.items.map((place) => (
          <div className="flex w-full items-center gap-16" key={place.id}>
            {place.photos.map((photo) => (
              <div
                className="flex mt-12  bg-dark-900 justify-center w-[540px] h-[240px]"
                key={place.id}
              >
                <Link
                  href={{
                    pathname: routes.places.place(place.slug),
                  }}
                >
                  <ImageComponent
                    className="object-cover"
                    alt={photo.alt}
                    width={540}
                    height={240}
                    src={photo.versions.huge.url}
                  />
                </Link>
              </div>
            ))}
            <div className="flex gap-10 max-w-[540px] flex-col break-words">
              <h3 className="text-4xl font-light leading-7 text-dark-100">
                {place.nameCemetery}
              </h3>
              <section className="text-xl text-light-300 leading-7 break-words font-light">
                <MarkupRenderer
                  markup={`${place.description.substring(0, 140)}...`}
                />
              </section>
            </div>
          </div>
        ))
      ) : (
        <div>No Places</div>
      )}
    </div>
  );
};
{
  /* <div className="flex align-middle mt-[82px] justify-between"> */
}
{
  /*  <AiOutlineLeftCircle */
}
{
  /*    size={56} */
}
{
  /*    fill="#bdc1c7" */
}
{
  /*    aria-label="prevPageLabel" */
}
{
  /*  /> */
}
{
  /*  <div className="font-normal text-xl leading-6 text-light-100"> */
}
{
  /*    <span>01/</span> */
}
{
  /*    <span className="text-dark-100">05</span> */
}
{
  /*  </div> */
}
{
  /*  <AiOutlineRightCircle */
}
{
  /*    aria-label="nextPageLabel" */
}
{
  /*    size={56} */
}
{
  /*    fill="#bdc1c7" */
}
{
  /*  /> */
}
{
  /* </div> */
}
