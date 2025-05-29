export interface Product {
  name: string;
  store: string;
  description: string;
  price: number;
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
