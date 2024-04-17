import { SvgIconComponent } from '@mui/icons-material';

export interface ISidebarMenuItem {
  label: string;
  icon?: SvgIconComponent | (() => JSX.Element);
  route: string;
}
