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
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-dark-900" />
          </>
        )}
        {items.map((item, index) => (
          <DropdownMenuItem key={index}>
            {!item.content && item.title ? (
              <LinkComponent
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
