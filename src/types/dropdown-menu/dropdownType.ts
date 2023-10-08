export interface DropdownMenuItems {
  title?: string;
  href?: string;
  content?: React.ReactNode;
}

export interface DropdownMenuComponentProps {
  children: React.ReactNode;
  items: DropdownMenuItems[];
  menuLabel?: string;
}
