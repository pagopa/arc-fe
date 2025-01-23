import '@testing-library/jest-dom';
import { downloadReceiptPDF } from './files';
import utils from 'utils';
import { waitFor } from '@testing-library/react';
import { Mock } from 'vitest';

vi.mock('utils/loaders');

describe('files', () => {
  it('should give a console warning if no link is present', async () => {
    const mockTransactionReceipt = utils.loaders.getReceiptPDF as Mock;
    global.URL.createObjectURL = vitest.fn();

    mockTransactionReceipt.mockResolvedValue(null);
    await waitFor(() => {
      expect(downloadReceiptPDF('1')).rejects.toThrowError('Error getting the PDF');
    });
  });
});
