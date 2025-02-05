import { useTranslation } from 'react-i18next';
import DetailsSkeleton from './detailsSkeleton';

const TransactionDetails = () => {
  const { t } = useTranslation();
  return <DetailsSkeleton title={t('app.transactionDetail.title')} direction="row-reverse" />;
};
export default TransactionDetails;
