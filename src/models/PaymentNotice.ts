import { PaymentNoticeDTO, PaymentOptionDTO } from '../../generated/apiClient';

export enum PaymentNoticeEnum {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

export type NoticeImage = {
  src: string;
  alt: string;
};

export type PaymentNoticeEnhanced = PaymentNoticeDTO & {
  image: NoticeImage;
  type: PaymentNoticeEnum;
};

export type PaymentOptionType = PaymentOptionDTO & {
  amount: string;
  dueDate: string;
  description: string;
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
