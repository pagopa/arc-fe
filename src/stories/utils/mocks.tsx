import { storicoItemProps } from 'src/components/Storico/StoricoItem';
import { fn } from '@storybook/test';

export const dummyStoricoData: storicoItemProps[] = [
  {
    payee: {
      name: 'Regione Lombardia',
      srcImg: '/regione-lombardia.svg',
      altImg: 'Regione Lombardia'
    },
    id: '123456',
    date: '01/12/2023',
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
    payee: {
      name: 'ACI',
      srcImg: '/aci.svg',
      altImg: 'ACI'
    },
    id: '123456',
    date: '16/11/2023',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '100,00 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  },
  {
    payee: {
      name: 'Avvisi multipli'
    },
    id: '123456',
    date: '03/11/2023',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '274,50 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  },
  {
    payee: {
      name: 'Avvisi multipli'
    },
    id: '123456',
    date: '12/08/2023',
    status: {
      label: 'Pagato',
      color: 'success'
    },
    amount: '392,00 €',
    detailsButton: {
      text: 'Vedi i dettagli',
      action: fn()
    }
  }
];
