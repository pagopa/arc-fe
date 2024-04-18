import TransactionDetail from 'src/components/TransactionDetail';
import { dummyTransactionsData } from '../stories/utils/mocks';

export default function Transaction() {
  return <TransactionDetail transactionData={dummyTransactionsData.transactionData} />;
}
