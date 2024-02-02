"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Divider, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Total } from "../../../components/Total";
import { Product } from "../../../models";

const productFormSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1),
});
type ProductFormValues = z.infer<typeof productFormSchema>;

type ProductQuantityFormProps = {
  product: Product;
};
export function ProductQuantityForm({ product }: ProductQuantityFormProps) {
  const { control, register, getValues, watch } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      product_id: product.id,
      quantity: 1,
    },
  });

  const [total, setTotal] = useState(product.price * getValues().quantity);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "quantity" || name?.includes("attributes")) {
        setTotal(product.price * getValues().quantity);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, product, getValues]);

  return (
    <Box component="form" sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <SettingsSuggestIcon />
          <Typography variant="h6">Configure sua compra</Typography>
        </Box>
        <Box display={{ xs: "none", md: "block" }}>
          <Total total={total} />
        </Box>
      </Box>
      <input
        type="hidden"
        value={product.id}
        {...register("product_id")}
      />
      <Controller
        name="quantity"
        control={control}
        defaultValue={1}
        render={({ field, fieldState }) => (
          <Box sx={{ mt: 1 }}>
            <Typography>Quantidade</Typography>
            <Slider
              sx={{ mt: 5 }}
              valueLabelDisplay="on"
              step={1}
              marks
              min={1}
              max={10}
              {...field}
            />
          </Box>
        )}
      />
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button type="submit" sx={{ mt: 3 }} startIcon={<ShoppingCartIcon />}>
          Colocar no carrinho
        </Button>
      </Box>
    </Box>
  );
}
