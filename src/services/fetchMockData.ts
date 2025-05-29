import { slugify } from "@/lib/utils";
import { Product, Store } from "@/types/store";

import { mockData } from "../../public/data/mockData";

export const fetchMockData = async (): Promise<Store[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2300));
  return mockData;
};

export const fetchStoreData = async (title: string): Promise<Store | null> => {
  const stores = await fetchMockData();
  const store = stores.find(
    (store) => store.title.toLowerCase() === title.toLowerCase(),
  );
  return store || null;
};

export const fetchProductData = async (
  storeSlug: string,
  productSlug: string,
): Promise<{ store: Store; product: Product } | null> => {
  const stores = await fetchMockData();

  const store = stores.find((s) => slugify(s.title) === storeSlug);
  if (!store) return null;

  for (const productList of Object.values(store.categories)) {
    const product = productList?.find((p) => slugify(p.name) === productSlug);
    if (product) return { store, product };
  }

  return null;
};
