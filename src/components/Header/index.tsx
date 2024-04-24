import React from 'react';
import { HeaderAccount, HeaderProduct, JwtUser } from '@pagopa/mui-italia';
import utils from 'utils';

/*
User info
*/
const mockUser: JwtUser = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  email: 'john.doe@gmail.com'
};

interface HeaderProps {
  onAssistanceClick?: () => void;
}

const Header = (props: HeaderProps) => {
  /* istanbul ignore next */
  const { onAssistanceClick = () => null } = props;

  return (
    <>
      <HeaderAccount
        rootLink={utils.config.pagopaLink}
        enableDropdown
        onAssistanceClick={onAssistanceClick}
        loggedUser={mockUser}
        userActions={utils.config.userActions}
      />
      <HeaderProduct productsList={[utils.config.product]} />
    </>
  );
};

export default Header;
