export interface IDropdownMenuItems {
  title?: string;
  href?: string;
  content?: React.ReactNode;
}

export interface IDropdownMenuComponentProps {
  children: React.ReactNode;
  items: IDropdownMenuItems[];
  menuLabel?: string | JSX.Element;
}
