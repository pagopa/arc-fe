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
  dueDate: string;
  description: string;
  installments: PaymentInstallmentType[];
};

export type PaymentNoticeMultipleType = PaymentNoticeEnhanced & {
  type: PaymentNoticeEnum.MULTIPLE;
  paymentOptions: PaymentOptionType[];
};

export type PaymentNoticeSingleType = PaymentNoticeEnhanced & {
  type: PaymentNoticeEnum.SINGLE;
  paymentOptions: PaymentOptionType;
};

export type PaymentNoticeType = PaymentNoticeSingleType | PaymentNoticeMultipleType;
