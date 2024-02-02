'use client';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSearchParams } from 'next/navigation';
import { useQueryStates, parseAsString } from 'nuqs';
import { useEffect, useState } from 'react';
import { searchParsers } from '../../utils/searchParams';

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
  const [names, setName] = useQueryStates(searchParsers);

  const [initialValue, setProductName] = useState<string>(
    names.byProductName || '',
  );

  useEffect(() => {
    setProductName(() => names.byProductName ?? '');
  }, [names.byProductName]);

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

          setName({ byProductName }, { shallow: false });
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