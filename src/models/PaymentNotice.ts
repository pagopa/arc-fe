import { InstallmentDTO, PaymentNoticeDTO, PaymentOptionDTO } from '../../generated/apiClient';

export enum PaymentNoticeEnum {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

export type NoticeImage = {
  src: string;
  alt: string;
};

export type PaymentNoticeEnhanced = Omit<PaymentNoticeDTO, 'paymentOptions'> & {
  image: NoticeImage;
  type: PaymentNoticeEnum;
};

export type PaymentInstallmentType = Omit<InstallmentDTO, 'amount'> & {
  amount: string;
  dueDate: string;
};

export type PaymentOptionType = Omit<PaymentOptionDTO, 'amount' | 'installments'> & {
  amount: string;
  amountValue: number;
  dueDate: string;
  description: string;
  installments: PaymentInstallmentType[] | PaymentInstallmentType;
};

export type PaymentOptionSingle = PaymentOptionType & {
  installments: PaymentInstallmentType;
};

export type PaymentOptionMultiple = PaymentOptionType & {
  installments: PaymentInstallmentType[];
};

export type PaymentNoticeMultipleType = PaymentNoticeEnhanced & {
  type: PaymentNoticeEnum.MULTIPLE;
  paymentOptions: PaymentOptionMultiple[];
};

export type PaymentNoticeSingleType = PaymentNoticeEnhanced & {
  type: PaymentNoticeEnum.SINGLE;
  paymentOptions: PaymentOptionSingle;
};

export type PaymentNoticeType = PaymentNoticeSingleType | PaymentNoticeMultipleType;
