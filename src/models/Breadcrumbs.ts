export interface BreadcrumbPath {
  backButton?: boolean;
  elements: BreadcrumbElement[];
  routeName?: string;
}

export interface BreadcrumbElement {
  name: string;
  fontWeight: number;
  color?: string;
  href?: string;
}

export interface RouteHandleObject {
  crumbs: BreadcrumbPath;
  sidebar: { visible?: boolean };
}
