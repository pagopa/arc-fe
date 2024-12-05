import React from 'react';
import MASTERCARD from '../../assets/creditcard/mastercard.png';
import VISA from '../../assets/creditcard/visa.png';
import AMEX from '../../assets/creditcard/amex.png';
import MAESTRO from '../../assets/creditcard/maestro.png';
import JBC from '../../assets/creditcard/jcb.png';
import OTHER from '../../assets/creditcard/other.png';
import DINERS from '../../assets/creditcard/diners.png';
import DISCOVER from '../../assets/creditcard/discover.png';
import UNIONPAY from '../../assets/creditcard/unionpay.png';
import { BRANDS } from '../../models/NoticeDetail';

const brandToAssetMap: { [key in BRANDS]: string } = {
  [BRANDS.MASTERCARD]: MASTERCARD,
  [BRANDS.VISA]: VISA,
  [BRANDS.AMEX]: AMEX,
  [BRANDS.MAESTRO]: MAESTRO,
  [BRANDS.JCB]: JBC,
  [BRANDS.OTHER]: OTHER,
  [BRANDS.DINERS]: DINERS,
  [BRANDS.DISCOVER]: DISCOVER,
  [BRANDS.UNIONPAY]: UNIONPAY
};

interface Props {
  name: BRANDS;
}

const BRAND = (props: Props) => {
  const { name } = props;
  return <img alt={name} src={brandToAssetMap[name] || OTHER} />;
};

export default BRAND;
