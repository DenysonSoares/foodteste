"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import CartButton from "@/components/atoms/cartButton";
import ComplementSelector from "@/components/atoms/complement";
import CutlerySelector from "@/components/atoms/cutlery";
import DrinkSelector from "@/components/atoms/drinkSelector";
import Loading from "@/components/atoms/loading";
import ProductQuantity from "@/components/atoms/productQuantity";
import SizeSelector from "@/components/atoms/size";
import ProductBanner from "@/components/sections/productBanner";
import { formatReal } from "@/lib/utils";
import { fetchProductData } from "@/services/fetchMockData";
import { Product, Store } from "@/types/store";

const ProductPage = () => {
  const id = useId();
  const params = useParams();
  const storeSlug = params.store as string;
  const productSlug = params.product as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  const [basePrice, setBasePrice] = useState(0);
  const [cutleryTotal, setCutleryTotal] = useState(0);

  const [selectedSize, setSelectedSize] = useState<{
    label: string;
    price: number;
    promotion?: number;
  } | null>(null);

  const [selectedDrinks, setSelectedDrinks] = useState<
    Record<string, { price: number; quantity: number }>
  >({});

  const [selectedCutlery, setSelectedCutlery] = useState({
    wants: false,
    price: 0,
  });

  const [selectedComplements, setSelectedComplements] = useState<string[]>([]);

  const drinkTotal = useMemo(() => {
    return Object.values(selectedDrinks).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [selectedDrinks]);

  const totalPrice = basePrice + drinkTotal + cutleryTotal;

  const canAdd = !!selectedSize && selectedComplements.length > 0;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductData(storeSlug, productSlug);
        if (data) {
          setProduct(data.product);
          setStore(data.store);
          setBasePrice(data.product.price);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [storeSlug, productSlug]);

  const handleDrinkChange = useCallback(
    (drinks: Record<string, { price: number; quantity: number }>) => {
      setSelectedDrinks(drinks);
    },
    [],
  );

  if (loading) return <Loading />;
  if (!product || !store) return <p className="p-4">Produto não encontrado.</p>;

  return (
    <div>
      <ProductBanner src="/assets/images/product-banner.png" />

      <div className="p-4">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-[14px] font-extrabold text-[#6D6F73]">
          a partir de{" "}
          <strong className="text-[18px] text-[#7B1FA2]">
            R$ {formatReal(product.price)}
          </strong>
        </p>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      </div>

      <ProductQuantity
        productId={id}
        store={store.title}
        storeImage={store.image}
        price={totalPrice}
        name={product.name}
        options={{
          size: selectedSize,
          drinks: selectedDrinks,
          cutlery: selectedCutlery,
          complements: selectedComplements,
        }}
        canAdd={canAdd}
      />

      <SizeSelector
        price={product.price}
        onChange={(size) => {
          const finalPrice = size.promotion ?? size.price;
          setBasePrice(finalPrice);
          setSelectedSize(size);
        }}
      />

      <ComplementSelector onChange={setSelectedComplements} />

      <DrinkSelector onChange={handleDrinkChange} />

      <CutlerySelector
        basePrice={30}
        onChange={(price, wants) => {
          setCutleryTotal(wants ? price : 0);
          setSelectedCutlery({ wants, price });
        }}
      />

      <CartButton />
    </div>
  );
};

export default ProductPage;
