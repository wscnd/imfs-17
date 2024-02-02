"use client";

import { FormControl, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Category } from "../../models";

type SelectCategoryProps = {
  categories?: Array<Category>
};

export function SelectCategory({ categories }: SelectCategoryProps) {
  return (
    <FormControl size="small" sx={{ width: 200 }}>
      <Select
        className="select-category"
        name="select-category"
        sx={{ backgroundColor: grey[400] }}
        onChange={(event) => {}}
      >
        <MenuItem value="0">Todas as categorias</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
