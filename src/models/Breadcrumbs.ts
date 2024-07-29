export interface BreadcrumbPath {
  elements?: BreadcrumbElement[];
  routeName?: string;
}

export interface BreadcrumbElement {
  name: string;
  fontWeight?: number;
  color?: string;
  href?: string;
}

export interface RouteHandleObject {
  crumbs?: BreadcrumbPath;
  sidebar: { visible?: boolean };
  backButton?: boolean;
  backButtonText?: string;
  backButtonFunction?: () => void;
}
