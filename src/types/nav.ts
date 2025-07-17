export type LinkItem = {
  type: "link";
  label: string;
  href: string;
};

export type SubmenuItem = {
  type: "submenu";
  label: string;
  submenu: LinkItem[];
  footerLink?: { label: string; href: string };
};

export type NavDropdownItemProps = LinkItem | SubmenuItem;

export type NavDropdownProps = {
  label: string;
  menu: NavDropdownItemProps[];
};

export type NavbarProps = {
  courseMenu: NavDropdownItemProps[];
  // educatorMenu: NavDropdownItemProps[];
  // blogMenu: NavDropdownItemProps[];
};
