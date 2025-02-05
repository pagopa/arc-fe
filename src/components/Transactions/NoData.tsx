import React from 'react';
import { Typography, Paper } from '@mui/material';

const NoData = (props: { title: string; text: string }) => {
  const { title, text } = props;
  return (
    <Paper elevation={0} sx={{ margin: '4px', padding: 2 }}>
      <Typography
        mb={2}
        variant="body2"
        fontWeight={600}
        data-testid="app.paymentNotice.filtered.noData"
        textAlign="center">
        {title}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={400}
        data-testid="app.paymentNotice.filtered.noData"
        textAlign="center">
        {text}
      </Typography>
    </Paper>
  );
};

export default NoData;
