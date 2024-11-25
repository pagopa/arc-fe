import { SvgIconComponent } from '@mui/icons-material';

export interface ISidebarMenuItem {
  label: string;
  icon?: SvgIconComponent | (() => JSX.Element);
  route: string;
  /* The end prop changes the matching logic for the active and pending states to only match to the "end" of the NavLink's to path.
  If the URL is longer than to, it will no longer be considered active. */
  end?: boolean;
}
