import { Button, Card, CardActions, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';

interface IContex {
  show: boolean;
  open: () => void;
  close: () => void;
}

const Modalcontext = React.createContext<IContex>({ show: false, open: () => {}, close: () => {} });

export { Modalcontext };

const Modale = () => {
  const { show, close } = React.useContext(Modalcontext);
  const navigate = useNavigate();
  return (
    <Modal
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={close}
      open={show}>
      <Card
        sx={{
          padding: 3,
          width: '50%'
        }}>
        <CardActions>
          <Stack spacing={2} width={'100%'}>
            <Typography variant="h4">Consenti a PagoPA di ricercare i tuoi avvisi?</Typography>
            <Typography variant="body1">
              Se confermi, consenti a PagoPA di ricercare gli avvisi di pagamento a tuo nome tra gli
              archivi degli enti aderenti al servizio. Proseguendo accetti l’Informativa Privacy e i
              Termini e Condizioni d’uso del servizio.
            </Typography>
            <Stack pt={2} direction={'row'} spacing={2} justifyContent={'end'}>
              <Button variant="outlined" size="large" color="primary" onClick={close}>
                annulla
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  close();
                  navigate(ArcRoutes.PAYMENT_NOTICES);
                }}>
                continua
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      </Card>
    </Modal>
  );
};

const ModalSystem = (props) => {
  const [show, setShow] = React.useState(false);
  const { children } = props;
  const open = () => setShow(true);
  const close = () => setShow(false);
  return (
    <>
      <Modalcontext.Provider value={{ show, open, close }}>
        <Modale />
        {children}
      </Modalcontext.Provider>
    </>
  );
};

export { ModalSystem };

export { Modale };
