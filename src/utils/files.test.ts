import '@testing-library/jest-dom';
import { getReceipt } from './files';
import utils from 'utils';
import { waitFor } from '@testing-library/react';

jest.mock('utils/loaders');

describe('files', () => {
  it('should give a console warning if no link is present', async () => {
    const mockTransactionReceipt = utils.loaders.getReceiptData as jest.Mock;
    mockTransactionReceipt.mockResolvedValue(null);
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    getReceipt('1');

    await waitFor(() => {
      expect(consoleWarn).toHaveBeenCalled();
    });
  });
});
