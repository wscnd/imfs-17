"use client";

import { Box, Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PaidIcon from "@mui/icons-material/Paid";
import { placeOrder } from '../../server-actions/order.actions';

export function CheckoutForm() {
  return (
    <Box component={'form'} action={placeOrder}>
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={6}>
          <TextField
            name="cc-name"
            required
            label="Nome no cartão"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            defaultValue={'João da Silva'}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <TextField
            name="cc-number"
            required
            label="Número do cartão"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            defaultValue={'4111111111111111'}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <TextField
            name="cc-exp"
            required
            label="Data de expiração MM/YYYY"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            defaultValue={'12/2022'}
          />
        </Grid2>
        <Grid2 xs={12} md={6}>
          <TextField
            name="cc-csc"
            required
            label="CVV"
            helperText="Código de segurança"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            defaultValue={'123'}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
        <Button type="submit" sx={{ mt: 3 }} startIcon={<PaidIcon />}>
          Pagar
        </Button>
      </Box>
    </Box>
  );
}