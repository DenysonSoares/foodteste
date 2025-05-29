export interface Product {
  name: string;
  description: string;
  price: number;
  store?: string;
}

export interface Store {
  title: string;
  image: string;
  free_delivery: boolean;
  value_delivery: number;
  avaliation: number;
  open: boolean;
  categories: {
    [categoryName: string]: Product[] | undefined;
  };
}
