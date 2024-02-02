'use client';

import { FormControl, MenuItem, Select } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQueryStates } from 'nuqs';
import { useState } from 'react';
import { TCategory } from '@nx-imfs-17/shared/types';
import { searchParsers } from '../../utils/searchParams';

type SelectCategoryProps = {
  categories: Array<TCategory>;
};

export function SelectCategory({ categories }: SelectCategoryProps) {
  const [names, setName] = useQueryStates(searchParsers);

  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        name="select-category"
        sx={{ backgroundColor: grey[400] }}
        value={names.byCategoryId ?? 'default'}
        onChange={(event) => {
          const byCategoryId =
            event.target.value === 'default' ? null : event.target.value;
          setName({ byCategoryId }, { shallow: false });
        }}
      >
        <MenuItem value="default">Todas as categorias</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
