import React from 'react';
import { HeaderAccount, HeaderProduct, JwtUser, UserAction } from '@pagopa/mui-italia';
import utils from 'utils';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

/*
User info
*/
const mockUser: JwtUser = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  email: 'john.doe@gmail.com'
};

export interface HeaderProps {
  onAssistanceClick?: () => void;
}

export const Header = (props: HeaderProps) => {
  /* istanbul ignore next */
  const { onAssistanceClick = () => null } = props;
  const navigate = useNavigate();

  const userActions: UserAction[] = [
    {
      id: 'profile',
      label: 'I tuoi dati',
      onClick: () => {
        navigate(ArcRoutes.USER);
      },
      icon: <SettingsIcon fontSize="small" color="inherit" />
    },
    {
      id: 'logout',
      label: 'Esci',
      onClick: () => {
        console.log('User logged out');
      },
      icon: <LogoutRoundedIcon fontSize="small" color="inherit" />
    }
  ];

  return (
    <>
      <HeaderAccount
        rootLink={utils.config.pagopaLink}
        enableDropdown
        onAssistanceClick={onAssistanceClick}
        loggedUser={mockUser}
        userActions={userActions}
      />
      <HeaderProduct productsList={[utils.config.product]} />
    </>
  );
};
