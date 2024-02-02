import { searchParamsCache } from '../../utils/searchParams';
import ProductsPage from './products';

type SearchParams = {
  searchParams: {
    byProductName?: string;
    byCategoryId?: string;
  };
};

async function ListProductsPage({
  searchParams: { byCategoryId, byProductName },
}: SearchParams) {
  searchParamsCache.parse({
    byCategoryId,
    byProductName,
  });

  return <ProductsPage key={`${byCategoryId}-${byProductName}`} />;
}

export default ListProductsPage;
