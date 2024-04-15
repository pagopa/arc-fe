import { IStoricoItem } from 'src/components/Storico/StoricoItem';
import { fn } from '@storybook/test';

export const dummyStoricoData: IStoricoItem[] = [
  {
    ente: 'Comune di Milano',
    id: '123456',
    date: '12/12/2024',
    status: {
      label: 'Pagato',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      color: 'success'
    },
    amount: '123,50 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  },
  {
    ente: 'Comune di Milano',
    id: '123456',
    date: '12/12/2024',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '123,50 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  },
  {
    ente: 'Comune di Milano',
    id: '123456',
    date: '12/12/2024',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '123,50 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  },
  {
    ente: 'Comune di Milano',
    id: '123456',
    date: '12/12/2024',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '123,50 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  }
];
