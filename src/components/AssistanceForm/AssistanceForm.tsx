import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  Stack,
  TextField,
  Typography,
  useTheme,
  Link,
  Box
} from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';
import utils from 'utils';
import { zendeskAssistanceTokenResponseSchema } from '../../../generated/zod-schema';

export const AssistanceForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data } = utils.loaders.getUserInfo();
  const [email, setEmail] = useState(data?.email || '');
  const [emailError, setEmailError] = useState(false);
  const [emailConfirmError, setEmailConfirmError] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState('');
  const reg = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  const [active, setActive] = useState(false);

  async function getAssistanceJWT(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      await utils.apiClient.token
        .getZendeskAssistanceToken({
          userEmail: email
        })
        .then((data) => {
          const { data: zendeskAssistance } = data;
          const resultData = zendeskAssistanceTokenResponseSchema.safeParse(zendeskAssistance);
          if (!resultData.success) throw resultData.error;
          if (zendeskAssistance.assistanceToken == '' || zendeskAssistance.returnTo == '')
            throw 'Empty response' + zendeskAssistance;

          const form = document.getElementById('jwtForm') as HTMLFormElement;
          const jwtString = document.getElementById('jwtString') as HTMLInputElement;
          const returnTo = document.getElementById('returnTo') as HTMLInputElement;
          const actionUrl = document.getElementById('jwtForm') as HTMLInputElement;
          jwtString.setAttribute('value', zendeskAssistance.assistanceToken);
          returnTo.setAttribute('value', zendeskAssistance.returnTo);
          actionUrl.setAttribute('action', zendeskAssistance.actionUrl);

          form.submit();
        });
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    if (email) setEmailError(!reg.test(email));
    if (emailConfirm) setEmailConfirmError(email !== emailConfirm);
    setActive(reg.test(email) && emailConfirm === email);
  }, [email, emailConfirm]);

  useEffect(() => {
    setEmail(data?.email || '');
  }, [data?.email]);

  return (
    <>
      <form>
        <Stack spacing={3}>
          <Stack
            flex={1}
            direction={{ xs: 'column', sm: 'column' }}
            justifyContent={'space-between'}
            gap={2}
            mb={5}>
            <Typography variant="h3">{t('app.assistance.title')}</Typography>

            <Typography variant="body1">{t('app.assistance.description')}</Typography>
          </Stack>
          <Card
            sx={{
              padding: 2,
              width: '100%'
            }}>
            <CardActions>
              <Stack spacing={2} width={'100%'}>
                <Typography variant="h4">{t('app.assistance.cardTitle')}</Typography>
                <Typography variant="body1">{t('app.assistance.cardDescription')}</Typography>
                <Stack spacing={3}>
                  <TextField
                    inputProps={{ 'data-testid': 'confirm-email' }}
                    role="textbox"
                    aria-required="false"
                    value={email}
                    aria-label={t('app.assistance.input1Placeholder')}
                    size="small"
                    error={emailError}
                    helperText={emailError && t('app.assistance.input1Helper')}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    sx={{ maxWidth: { lg: '20vw', md: '25vw', sm: '35vw', xs: '100%' } }}
                    label={t('app.assistance.input1Placeholder')}
                    InputLabelProps={{
                      sx: {
                        color: theme.palette.text.secondary,
                        fontWeight: 600
                      }
                    }}
                  />
                  <TextField
                    inputProps={{ 'data-testid': 'assistance-confirm-email' }}
                    role="textbox"
                    aria-required="false"
                    value={emailConfirm}
                    error={emailConfirmError}
                    aria-label={t('app.assistance.input2Placeholder')}
                    onChange={(e) => {
                      setEmailConfirm(e.target.value);
                    }}
                    size="small"
                    sx={{ maxWidth: { lg: '20vw', md: '25vw', sm: '35vw', xs: '100%' } }}
                    label={t('app.assistance.input2Placeholder')}
                    helperText={emailConfirmError && t('app.assistance.input2Helper')}
                    InputLabelProps={{
                      sx: {
                        color: theme.palette.text.secondary,
                        fontWeight: 600
                      }
                    }}
                  />
                </Stack>
              </Stack>
            </CardActions>
          </Card>
          <Typography variant="body1">
            <Trans
              i18nKey={t('app.assistance.privacy')}
              components={{
                link1: <Link href="#" fontWeight={800} />
              }}
            />
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={() => utils.modal.open(utils.modal.ModalId.ASSISTANCEBACK)}>
              {t('app.routes.exit')}
            </Button>
            <Button
              type="submit"
              data-testid="assistance-confirm-button"
              variant="contained"
              size="large"
              onClick={(e) => getAssistanceJWT(e)}
              disabled={!active}>
              {t('app.assistance.confirm')}
            </Button>
          </Stack>
        </Stack>
      </form>
      <Box display="none">
        <form id="jwtForm" method="POST">
          <input readOnly type="hidden" id="jwtString" data-testid="jwtString" name="jwt" />
          <input readOnly type="hidden" id="returnTo" data-testid="returnTo" name="return_to" />
        </form>
      </Box>
    </>
  );
};
