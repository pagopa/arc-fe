import React from 'react';
import { HeaderAccount, JwtUser, UserAction } from '@pagopa/mui-italia';
import utils from 'utils';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import { useUserInfo } from 'hooks/useUserInfo';
import { SubHeader } from './SubHeader';

export interface HeaderProps {
  onAssistanceClick?: () => void;
}

export const Header = (props: HeaderProps) => {
  /* istanbul ignore next */
  const { onAssistanceClick = () => null } = props;
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      await utils.apiClient.logout.getLogoutEndpoint();
    } catch (e) {
      console.warn(e);
    } finally {
      utils.storage.user.logOut();
      navigate(ArcRoutes.LOGIN);
    }
  }

  const { userInfo } = useUserInfo();

  const jwtUser: JwtUser | undefined = userInfo
    ? {
        id: userInfo?.userId,
        name: utils.converters.capitalizeFirstLetter(userInfo?.name),
        surname: utils.converters.capitalizeFirstLetter(userInfo?.familyName),
        email: ''
      }
    : undefined;

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
      onClick: logoutUser,
      icon: <LogoutRoundedIcon fontSize="small" color="inherit" />
    }
  ];

  return (
    <>
      <HeaderAccount
        rootLink={utils.config.pagopaLink}
        enableDropdown
        onAssistanceClick={onAssistanceClick}
        loggedUser={jwtUser}
        userActions={userActions}
      />
      <SubHeader />
    </>
  );
};
