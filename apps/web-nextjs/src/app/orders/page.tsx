import {
  Box,
  Button,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { EOrderStatus } from '@nx-imfs-17/shared/types';
import { findOrders } from '../../server-actions/order.actions';

export async function OrdersPage() {
  const orders = await findOrders();

  return (
    <Box>
      <Typography variant="h4">Meus pedidos</Typography>
      {orders.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(parseInt(order.total))}
                  </TableCell>
                  <TableCell>
                    {order.status === EOrderStatus.PENDING ? (
                      <Typography variant="h5" sx={{ color: 'warning.main' }}>
                        ⏳
                      </Typography>
                    ) : order.status === EOrderStatus.PAID ? (
                      <Typography variant="h5" sx={{ color: 'success.main' }}>
                        ✔
                      </Typography>
                    ) : (
                      <Typography variant="h5" sx={{ color: 'error.main' }}>
                        ✖
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      component={Link}
                      href={`/orders/${order.id}`}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <ListItem>
          <ListItemText>Nenhum pedido feito.</ListItemText>
        </ListItem>
      )}
    </Box>
  );
}

export default OrdersPage;
