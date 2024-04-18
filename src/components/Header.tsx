import React from 'react';
import { HeaderAccount, HeaderProduct, JwtUser } from '@pagopa/mui-italia';
import utils from 'src/utils';

/*
User info
*/
const mockUser: JwtUser = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  email: 'john.doe@gmail.com'
};

export const Header = () => (
  <>
    <HeaderAccount
      rootLink={utils.config.pagopaLink}
      enableDropdown
      onAssistanceClick={() => null}
      loggedUser={mockUser}
      userActions={utils.config.userActions}
    />
    <HeaderProduct productsList={[utils.config.product]} />
  </>
);
