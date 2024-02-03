'use client';

import { FormControl, MenuItem, Select } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useCallback, useState } from 'react';
import { TCategory } from '@nx-imfs-17/shared/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SelectCategoryProps = {
  categories: Array<TCategory>;
};

export function SelectCategory({ categories }: SelectCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [initialValue] = useState<string>(
    searchParams.get('byCategoryId') || 'default',
  );

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete('byCategoryId');
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        name="select-category"
        sx={{ backgroundColor: grey[400] }}
        defaultValue={initialValue}
        onChange={(event) => {
          const byCategoryId =
            event.target.value === 'default' ? null : event.target.value;

          router.push(
            pathname + '?' + createQueryString('byCategoryId', byCategoryId),
          );
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
