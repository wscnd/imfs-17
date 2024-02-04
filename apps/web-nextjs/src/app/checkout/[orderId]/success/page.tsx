import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CheckIcon from '@mui/icons-material/Check';
import { Total } from '../../../../components/Total';
import { findOrderById } from '../../../../server-actions/order.actions';
import { redirect } from 'next/navigation';

type CheckoutSuccessPageParams = {
  params: {
    orderId: string;
  };
};

async function CheckoutSuccessPage({ params }: CheckoutSuccessPageParams) {
  const { status, id, items } = await findOrderById(params.orderId);

  if (!id) {
    redirect('/orders');
  }

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CheckIcon sx={{ color: 'success.main', mr: 2, fontSize: 150 }} />
            </Box>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Pedido {`${id}`} realizado com sucesso!
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>
          <Typography variant="subtitle2">{status}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd.</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.quantity * parseInt(item.price))}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Total
                      total={
                        items?.reduce(
                          (sum, { quantity, price }) =>
                            sum + quantity * parseInt(price),
                          0,
                        ) ?? 0
                      }
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default CheckoutSuccessPage;
