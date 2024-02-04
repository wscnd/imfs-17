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
import { EOrderStatus } from '@nx-imfs-17/shared/types';
import { Total } from '../../../components/Total';
import { findOrderById } from '../../../server-actions/order.actions';

type OrderIdPageParams = {
  params: {
    orderId: string;
  };
};

async function OrderIdPage({ params }: OrderIdPageParams) {
  const order = await findOrderById(params.orderId);

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
              {order.status === EOrderStatus.PENDING ? (
                <Typography variant="h1" sx={{ color: 'warning.main' }}>
                  ⏳
                </Typography>
              ) : order.status === EOrderStatus.PAID ? (
                <Typography variant="h1" sx={{ color: 'success.main' }}>
                  ✔
                </Typography>
              ) : (
                <Typography variant="h1" sx={{ color: 'error.main' }}>
                  ✖
                </Typography>
              )}
            </Box>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              {order.status === EOrderStatus.PENDING
                ? 'Pedido pendente'
                : order.status === EOrderStatus.PAID
                  ? 'Pedido pago'
                  : 'Pedido cancelado'}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Resumo do pedido</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produto</TableCell>
                <TableCell>Qtd.</TableCell>
                <TableCell>Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(parseInt(item.price))}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Total total={parseInt(order.total)} />
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

export default OrderIdPage;
