import useQueryParams from 'hooks/useQueryParams';
import React, { useEffect } from 'react';
import utils from 'utils';
import QueryLoader from 'components/QueryLoader';

const Callbackcomponent = () => {
  const { code, state } = useQueryParams();
  const { data } = utils.loaders.getTokenOneidentity(code, state);
  console.log(data);

  const Content = () => {
    return <p>ciao</p>;
  };

  return (
    <QueryLoader queryKey="tokenOneidentity">
      <Content />
    </QueryLoader>
  );
};

export default function AuthCallback() {
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  useEffect(() => {
    const code = getParameterByName('code');
    const state = getParameterByName('state');
    const url = `https://api.dev.cittadini-p4pa.pagopa.it/arc/v1/token/oneidentity?code=${code}&state=${state}`;
    fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log('Request Failed', err));

    console.log('auth');
  }, []);
  return <></>;
}
