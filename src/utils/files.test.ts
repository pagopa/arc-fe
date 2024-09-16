import '@testing-library/vi-dom';
import { getReceipt } from './files';
import utils from 'utils';
import { waitFor } from '@testing-library/react';

vi.mock('utils/loaders');

describe('files', () => {
  it('should give a console warning if no link is present', async () => {
    const mockTransactionReceipt = utils.loaders.getReceiptData as Mock;
    mockTransactionReceipt.mockResolvedValue(null);
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    getReceipt('1');

    await waitFor(() => {
      expect(consoleWarn).toHaveBeenCalled();
    });
  });
});
