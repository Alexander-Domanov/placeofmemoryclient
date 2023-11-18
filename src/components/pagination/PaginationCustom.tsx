import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { Input } from '@/ui';

interface IPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
}

export const PaginationCustom: FC<IPaginationProps> = ({
  page,
  pageCount,
  onPageChange,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    const newPage = parseInt(value, 10);

    if (!Number.isNaN(newPage) && newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage);
    } else {
      onPageChange(1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Delete'];
    if (
      Number.isNaN(Number(e.key)) &&
      !allowedKeys.includes(e.key) &&
      e.key.length === 1
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center gap-3 justify-center text-xl text-center sm:text-sm mt-24">
      <button
        className={`mr-32 sm:mr-16 text-5xl sm:text-2xl ${
          page <= 1
            ? 'text-dark-700 cursor-not-allowed'
            : 'text-dark-500 rounded-full shadow-icon'
        }`}
        onClick={() => onPageChange(page - 1)}
      >
        <BsArrowLeftCircleFill />
      </button>

      <span className="flex items-center">
        <Input
          type="text"
          value={page.toString()}
          min="1"
          className="w-[50px] h-[36px] ms:w-[30px] ms:h-[24px] text-center text-xl sm:text-sm"
          max={pageCount}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </span>

      <div>/</div>

      <span>{pageCount}</span>

      <button
        className={`ml-32 sm:ml-16 text-5xl sm:text-2xl ${
          page >= pageCount
            ? 'text-dark-700 cursor-not-allowed'
            : 'text-dark-500 rounded-full shadow-icon'
        }`}
        onClick={() => onPageChange(page + 1)}
      >
        <BsArrowRightCircleFill />
      </button>
    </div>
  );
};
export default PaginationCustom;

// const handleChangePage = (newPage: number) => {
//     if (dataPlaces && newPage >= 1 && newPage <= dataPlaces.pagesCount) {
//         setPage(newPage);
//     }
// };

// <PaginationCustom
//     page={(page as number) || 1}
//     pageCount={dataPlaces ? dataPlaces.pagesCount : 1}
//     onPageChange={handleChangePage}
// />
