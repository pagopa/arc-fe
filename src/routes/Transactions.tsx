import { useParams } from 'react-router-dom';

export default function Transactions() {
  const params = useParams();

  console.log(params);
  return <>transactions</>;
}
