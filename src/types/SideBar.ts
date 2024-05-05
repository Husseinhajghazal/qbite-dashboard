export interface SideBarItemI {
  icon: React.ReactNode;
  name: Name;
  notification: boolean;
  link: string;
  subNavItems: SideBarItemI[];
}

export interface Name {
  ar: string;
  en: string;
}
