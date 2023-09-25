interface MenuItemType {
  key: string;
  name: string;
  icon?: string;
  children?: MenuItemType[];
}

interface SubTitleContextType {
  $implicit: string;
  icon: string;
  open: boolean;
  disabled: boolean;
}

export {
  MenuItemType,
  SubTitleContextType,
};
