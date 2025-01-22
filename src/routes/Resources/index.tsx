import React, { useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';

interface Props {
  resource: 'tos' | 'pp';
}

const Resources = (props: Props) => {
  const { resource } = props;
  const resourceLink =
    resource == 'tos'
      ? 'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/draft/3f089590-8e93-4a08-86d4-40387d57cbad.json'
      : 'https://privacyportalde-cdn.onetrust.com/77f17844-04c3-4969-a11d-462ee77acbe1/privacy-notices/draft/8f1bdcb7-1b92-4f2f-bb03-43c2ab8bad58.json';

  const divId =
    resource == 'tos'
      ? 'otnotice-3f089590-8e93-4a08-86d4-40387d57cbad'
      : 'otnotice-8f1bdcb7-1b92-4f2f-bb03-43c2ab8bad58';

  useEffect(() => {
    OneTrust?.NoticeApi?.Initialized.then(function () {
      OneTrust.NoticeApi.LoadNotices([resourceLink], false);
    });
  }, []);

  return (
    <Grid
      item
      display={'flex'}
      marginTop={16}
      marginBottom={16}
      flexWrap={'wrap'}
      justifyContent={'center'}>
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
