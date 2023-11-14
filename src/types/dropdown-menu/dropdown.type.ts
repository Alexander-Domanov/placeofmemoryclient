export interface IDropdownMenuItems {
  title?: string;
  link?: string;
  content?: React.ReactNode;
}

export interface IDropdownMenuComponentProps {
  children: React.ReactNode;
  items: IDropdownMenuItems[];
  menuLabel?: null | JSX.Element;
}
