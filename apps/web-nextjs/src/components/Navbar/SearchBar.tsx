'use client';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: grey[400],
  '&:hover': {
    backgroundColor: grey[500],
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: grey[900],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: grey[900],
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

interface FormElements extends HTMLFormControlsCollection {
  byProductName: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [initialValue] = useState<string>(
    searchParams.get('byProductName') || '',
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name === 'byProductName' && value === '') {
        params.delete('byProductName');
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <form
        onSubmit={(event: React.FormEvent<UsernameFormElement>) => {
          event.preventDefault();
          const byProductName =
            event.currentTarget.elements.byProductName.value;
          router.push(
            pathname + '?' + createQueryString('byProductName', byProductName),
          );
        }}
      >
        <StyledInputBase
          name="byProductName"
          type="search"
          placeholder="Pesquisar…"
          defaultValue={initialValue}
        />
      </form>
    </Search>
  );
}
