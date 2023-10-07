import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  LinkComponent,
} from '@/ui';
import { DropdownMenuComponentProps } from '@/types';

export const DropdownMenuComponent = ({
  children,
  items,
  menuLabel,
}: DropdownMenuComponentProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuLabel && (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {items.map((item, index) => (
          <DropdownMenuItem key={index}>
            {!item.content && item.title ? (
              <LinkComponent
                title={item.title}
                href={item.href ? item.href : ''}
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
