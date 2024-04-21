import TransactionDetail from '../components/Transactions/TransactionDetail';
import { dummyTransactionsData } from '../stories/utils/mocks';

export default function Transaction() {
  return <TransactionDetail transactionData={dummyTransactionsData.transactionData} />;
}
