import '@testing-library/jest-dom';
import utils from 'utils';

describe('downloadReceiptPDF function', () => {
  it('is called without error', async () => {
    vi.spyOn(utils.loaders, 'getReceiptPDF').mockResolvedValue({
      data: new File([''], 'test.pdf'),
      filename: 'test.pdf'
    });

    URL.createObjectURL = vitest.fn();
    URL.revokeObjectURL = vitest.fn();
    expect(utils.files.downloadReceiptPDF('1')).resolves.toBeUndefined();
  });

  it('should trhow an Error when something goes wrong', () => {
    vi.spyOn(utils.loaders, 'getReceiptPDF').mockResolvedValue(null);
    expect(utils.files.downloadReceiptPDF('1')).rejects.toThrowError('Error getting the PDF');
  });
});
