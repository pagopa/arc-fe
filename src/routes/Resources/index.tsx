import React, { useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import './resources.css';
interface Props {
  resource: 'tos' | 'pp';
}

const Resources = (props: Props) => {
  const { resource } = props;
  const resourceLink =
    resource == 'tos'
      ? 'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/65d4c60f-2380-4d01-9ce2-0f6711de44b7.json'
      : 'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/d8bf2ad2-aa7c-47bb-90d6-76baa6501e6a.json';

  const divId =
    resource == 'tos'
      ? 'otnotice-65d4c60f-2380-4d01-9ce2-0f6711de44b7'
      : 'otnotice-d8bf2ad2-aa7c-47bb-90d6-76baa6501e6a';

  useEffect(() => {
    OneTrust?.NoticeApi?.Initialized.then(function () {
      OneTrust.NoticeApi.LoadNotices([resourceLink], false);
    });
  }, []);

  return (
    <Grid item display={'flex'} flexWrap={'wrap'} justifyContent={'center'}>
      <Box width={'100%'}>
        <Stack textAlign={'center'} justifyContent={'center'} alignItems={'center'} spacing={4}>
          <Stack spacing={2} paddingX={1}></Stack>
          <div id={divId} className="otnotice"></div>
        </Stack>
      </Box>
    </Grid>
  );
};

export default Resources;
