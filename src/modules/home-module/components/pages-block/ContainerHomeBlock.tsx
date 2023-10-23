import { twMerge } from 'tailwind-merge';

interface IContainerBlockHome {
  className?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  children: React.ReactNode;
}
export const ContainerHomeBlock = ({
  className,
  children,
}: IContainerBlockHome) => {
  return (
    <section
      className={twMerge(
        'flex bg-amber-800 justify-center items-center h-screen text-base w-full',
        className
      )}
    >
      {children}
    </section>
  );
};
