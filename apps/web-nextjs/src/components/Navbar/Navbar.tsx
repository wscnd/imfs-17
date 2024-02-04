import HomeIcon from '@mui/icons-material/Home';
import { Suspense } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { useCategories } from '../../server-actions/categories.actions';
import { TCategory } from '@nx-imfs-17/shared/types';
import { getUserToken } from '../../server-actions/login.actions';

type CategoryProps = {
  categories: Array<TCategory>;
};

type WrapperProps = {
  children?: React.FunctionComponent<CategoryProps>;
};

export const Navbar: React.FunctionComponent<WrapperProps> = async (props) => {
  const categories = await useCategories();
  const user = await getUserToken();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <Link href={'/'} style={{ textDecoration: 'none' }}>
          <Image
            src="/logo.png"
            width={147.66}
            height={63.66}
            alt="logo"
            priority
          />
        </Link>
        <Box
          sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', ml: 1 }}
        >
          <SearchBar />
        </Box>
        <IconButton LinkComponent={Link} size="large" href="/cart">
          <ShoppingCartIcon />
        </IconButton>
        <UserMenu user={user} />
      </Toolbar>
      <Toolbar
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          alignContent: 'center',
          p: 1,
        }}
      >
        <Suspense>{props.children && props.children({ categories })}</Suspense>
        <Box
          component={Link}
          href={'/products'}
          sx={{ textDecoration: 'none', display: 'flex', ml: 3 }}
        >
          <HomeIcon sx={{ color: 'text.primary' }} />
          <Typography
            color="text.primary"
            sx={{ fontWeight: 500, display: 'flex' }}
          >
            Home
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
