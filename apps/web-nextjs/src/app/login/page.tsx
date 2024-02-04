import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { redirect } from 'next/navigation';
import { getUserToken, loginAction } from '../../server-actions/login.actions';

type SearchParams = {
  searchParams: {
    redirect_to?: string;
  };
};

async function LoginPage({ searchParams }: SearchParams) {
  const { redirect_to = '/products' } = searchParams;
  const user = await getUserToken();

  if (user.length !== 0) {
    redirect(redirect_to);
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entre com sua conta
      </Typography>
      <Box component={'form'} noValidate sx={{ mt: 1 }} action={loginAction}>
        <input type="hidden" name="redirect_to" value={redirect_to} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="E-mail"
          name="email"
          autoComplete="email"
          defaultValue={'user'}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          defaultValue={'user'}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
