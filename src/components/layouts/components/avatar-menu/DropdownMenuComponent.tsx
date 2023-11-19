import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LinkComponent,
} from '@/ui';
import { IDropdownMenuComponentProps } from '@/types';

export const DropdownMenuComponent = ({
  children,
  items,
  menuLabel,
}: IDropdownMenuComponentProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent px-3 text-sm outline-none focus:border-0">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-500 border-0 z-50 px-3 text-sm text-white select-none min-w-[4rem]">
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-light-300" />
          </>
        )}
        {items.map((item, index) => (
          <DropdownMenuItem
            className="my-3 cursor-pointer transition-colors"
            key={index}
          >
            {!item.content && item.title ? (
              <LinkComponent
                className="text-light-300"
                title={item.title}
                href={item.link ? item.link : ''}
              />
            ) : (
              item.content
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
