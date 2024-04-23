import * as React from 'react';
import { render } from '@testing-library/react';
import IOAlert from './IOAlert';
import '../../translations/i18n';

describe('IOAlert component', () => {
  it('should render as expected', () => {
    render(<IOAlert />);
  });
});
