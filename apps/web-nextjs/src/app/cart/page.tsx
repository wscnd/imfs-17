import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Link from 'next/link';
import React from 'react';
import { Total } from '../../components/Total';
import { removeFromCart } from '../../server-actions/cart.actions';
import { getProductsFromCookies } from '../../server-actions/products.actions';

async function CartPage() {
  const products = await getProductsFromCookies();

  return (
    <Box>
      <Typography variant="h3">
        <ShoppingCartIcon /> Meu carrinho
      </Typography>
      <Grid2 container>
        <Grid2 xs={10} sm={7} md={4}>
          <List>
            {products.map(([detail]) => {
              return (
                <React.Fragment key={detail.id}>
                  <ListItem
                    sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}
                  >
                    <ListItemAvatar>
                      <Avatar src={detail.image_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="button">
                            {detail.name} - Qtd. {detail.quantity}
                          </Typography>
                          <Typography sx={{ color: 'primary.main' }}>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(detail.quantity * detail.price)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem
                    sx={{ display: 'flex', justifyContent: 'end', p: 0 }}
                  >
                    <form action={removeFromCart}>
                      <input
                        type="hidden"
                        name="product_id"
                        value={detail.id}
                      />
                      <Button
                        color="error"
                        startIcon={<DeleteIcon />}
                        type="submit"
                      >
                        Excluir
                      </Button>
                    </form>
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 0 }} />
                </React.Fragment>
              );
            })}
            {!products?.length && (
              <ListItem>
                <ListItemText>Nenhum item no carrinho</ListItemText>
              </ListItem>
            )}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Total
              total={
                products?.reduce(
                  (sum, [{ quantity, price }]) => sum + quantity * price,
                  0,
                ) ?? 0
              }
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            {products?.length ? (
              <Button LinkComponent={Link} href="/checkout">
                Finalizar compra
              </Button>
            ) : (
              <Button LinkComponent={Link} href="/products">
                Continuar comprando
              </Button>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default CartPage;
