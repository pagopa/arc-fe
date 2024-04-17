import { useParams } from 'react-router-dom';
import NoticeDetail from 'src/components/NoticeDetail';

export default function Transaction() {
  const { ID } = useParams();
  return <NoticeDetail />;
}
