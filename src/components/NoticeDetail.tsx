import { Download } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import { CopyToClipboardButton } from '@pagopa/mui-italia';
import React from 'react';

export default function NoticeDetail() {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item>
        <Chip label="Pagato" color="success" />
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}>
        <Typography variant="h4">Bollo auto</Typography>
        <Stack direction="row" spacing={0.6}>
          <Button endIcon={<Download />} size="medium" variant="outlined">
            Scarica quietanza
          </Button>
          <Button endIcon={<Download />} size="medium" variant="contained">
            Scarica ricevuta
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={1.41} mt={1} width={'100%'}>
        <Box>
          <Typography variant="caption">
            Creato il <b>23 giugno 2022, 15:50</b>
          </Typography>
        </Box>
        <Box sx={{ bgcolor: theme.palette.background.default }} borderRadius={1.5} padding={2}>
          <Grid container>
            <Grid item xs={6}>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Pagato da
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
              </Stack>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Codice autorizzativo
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Codice autorizzativo
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Codice autorizzativo
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.primary.main }}>
                      <b>
                        <u>0000000000</u>
                      </b>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Intestato a
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
                <Typography variant="caption-semibold">CF</Typography>
              </Stack>
              <Grid container mt={1.13}>
                <Grid item xs={1} paddingTop={1.54}>
                  <CopyToClipboardButton value="VAL" color="primary" />
                </Grid>
                <Grid item xs={10} ml={1.33}>
                  <Stack padding={0.66}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Metodo di pagamento
                    </Typography>
                    <Typography variant="caption-semibold">Master card ****1234</Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Gestore della transazione (PSP)
                </Typography>
                <Typography variant="caption-semibold">Nexi</Typography>
              </Stack>
              <Stack padding={0.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Data e ora{' '}
                </Typography>
                <Typography variant="caption-semibold">Nexi</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4}>
              <Divider orientation="horizontal" />
            </Grid>

            <Grid item xs={6}>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Oggetto
                </Typography>
                <Typography variant="caption-semibold">Bollo auto</Typography>
              </Stack>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Debitore
                </Typography>
                <Typography variant="caption-semibold">Matteo Rossi</Typography>
                <Typography variant="caption-semibold">CF</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Ente creditore
                </Typography>
                <Typography variant="caption-semibold">ACI</Typography>
                <Typography variant="caption-semibold">0000</Typography>
              </Stack>
              <Stack pl={0.66} pt={2.66}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Codice avviso
                </Typography>
                <Typography variant="caption-semibold">00000</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} pt={4}>
              <Divider orientation="horizontal" />
            </Grid>
            <Grid item xs={12}>
              <Stack pl={0.66} pt={2.66} alignItems={'end'} spacing={1.333}>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Importo parziale
                  </Typography>
                  <Typography variant="caption-semibold">250.00 €</Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Commissione (applicata da Nexi)
                  </Typography>
                  <Typography variant="caption-semibold">1.00 €</Typography>
                </Stack>
                <Stack alignItems={'end'}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Totale
                  </Typography>
                  <Typography variant="h6">251.00 €</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Grid>
  );
}
