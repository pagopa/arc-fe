import { Download } from '@mui/icons-material';
import { Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react';

export default function NoticeDetail() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid item>
          <Chip label="Pagato" color="success"/>
        </Grid>
        <Grid item>
          <Typography variant="h4">Bollo auto</Typography>
        </Grid>
      </Grid>
      <Grid item xs={3} sm>
      <Button endIcon={<Download />} size="medium" variant="outlined">
          Scarica quietanza
        </Button>
      </Grid>
      <Grid item xs={3}>
      <Button endIcon={<Download />} size="medium" variant="contained">
          Scarica ricevuta
        </Button>
      </Grid>
      <Grid item>
        <Typography>Creato il <b>23 giugno 2022, 15:50</b></Typography>
      </Grid>
    </Grid>
  );
}
