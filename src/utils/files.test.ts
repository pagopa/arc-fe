import '@testing-library/jest-dom';
import { getReceipt } from './files';
import utils from 'utils';
import { waitFor } from '@testing-library/react';
import { Mock } from 'vitest';

vi.mock('utils/loaders');

describe('files', () => {
  it('should give a console warning if no link is present', async () => {
    const mockTransactionReceipt = utils.loaders.getReceiptData as Mock;
    global.URL.createObjectURL = vitest.fn();

    mockTransactionReceipt.mockResolvedValue(null);
    await waitFor(() => {
      expect(getReceipt('1')).rejects.toThrowError('receipt');
    });
  });
});
