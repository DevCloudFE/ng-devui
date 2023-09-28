import { MenuItemDirective } from "./menu-item.directive";

interface MenuItemType {
  key: string;
  name: string;
  icon?: string;
  children?: MenuItemType[];
}

interface MenuItemClickType {
  item: MenuItemDirective;
  event: MouseEvent;
}

interface SubTitleContextType {
  $implicit: string;
  icon: string;
  open: boolean;
  disabled: boolean;
}

type MenuHoverTypes = 'enter' | 'leave';

export {
  MenuItemType,
  MenuItemClickType,
  SubTitleContextType,
  MenuHoverTypes,
};
