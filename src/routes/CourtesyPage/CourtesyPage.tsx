import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const CourtesyPage = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          Sorry, the page you're looking for does not exist.
        </Typography>
        <Typography variant="body1" paragraph>
          Please navigate back to the homepage or try a different page.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};
