import { useParams } from 'react-router-dom';

export default function Transaction() {
  const { ID } = useParams();
  return <>transaction id: {ID}</>;
}
