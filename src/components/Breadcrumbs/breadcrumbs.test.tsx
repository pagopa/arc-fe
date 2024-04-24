import * as React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import '../../translations/i18n';

describe('Breadcrumbs component', () => {
  it('should render as expected', () => {
    render(
      <Breadcrumbs
        separator={<>test</>}
        crumbs={{
          routeName: 'testRouteName',
          backButton: true,
          elements: [
            { name: 'name1', fontWeight: 600 },
            { name: 'name2', fontWeight: 600 },
            { name: 'name2', fontWeight: 600, href: 'test' }
          ]
        }}
      />
    );
  });
});
