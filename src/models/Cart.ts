import { InstallmentDTO } from '../../generated/apiClient';

export type CartItem = Omit<InstallmentDTO, 'status' | 'dueDate'>;

export type CartState = {
  isOpen: boolean;
  amount: string;
  items: CartItem[];
};
