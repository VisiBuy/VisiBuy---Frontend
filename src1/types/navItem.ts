import { IconNameProps } from "../ui/Icon";
export interface NavItemProps {
  href: string;
  name: string;
  iconName: IconNameProps;
  isLight?: boolean;
}
